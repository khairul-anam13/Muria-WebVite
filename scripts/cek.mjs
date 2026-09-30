// Pemeriksaan sesudah build: `npm run cek`. Gagal = keluar dengan kode 1.
// Membaca token langsung dari src/index.css (sumber tunggal) dan memeriksa kontras di KEDUA tema.
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const html = readFileSync('dist/index.html', 'utf8');
const cssBuild = readdirSync('dist/assets')
  .filter((f) => f.endsWith('.css'))
  .map((f) => readFileSync(join('dist/assets', f), 'utf8'))
  .join('\n');
const sumber = readFileSync('src/index.css', 'utf8');
const gagal = [];
const cek = (ok, pesan) => ok || gagal.push(pesan);

// Prerender: HTML berisi halaman sungguhan, bukan cangkang SPA kosong
cek(!html.includes('<!--app-->'), 'penanda <!--app--> masih ada: prerender belum jalan');
cek(!/<div id="root">\s*<\/div>/.test(html) && html.includes('<div id="root"><'), '#root kosong: isi halaman tidak terprerender');
cek(!existsSync('dist-ssr'), 'folder dist-ssr sisa build belum dibersihkan');
cek(html.includes('type="application/ld+json"'), 'data terstruktur JSON-LD hilang');
cek(/font-family:\s*['"]?IBM Plex Sans/.test(cssBuild) && /font-family:\s*['"]?IBM Plex Mono/.test(cssBuild), '@font-face IBM Plex tidak ada di CSS hasil build');

// Struktur
cek((html.match(/<h1[\s>]/g) || []).length === 1, 'harus ada tepat satu <h1>');
for (const id of ['beranda', 'tentang', 'layanan', 'cara-kerja', 'keunggulan', 'testimoni', 'badan-usaha', 'lokasi', 'kontak'])
  cek(html.includes(`id="${id}"`), `bagian #${id} tidak ada`);
const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
for (const [, h] of html.matchAll(/href="#([^"]+)"/g)) cek(ids.has(h), `tautan #${h} tidak punya sasaran`);
cek(!html.includes('NaN'), 'ada NaN di HTML (hitungan geometri rusak)');
cek(/<html[^>]*lang="id"/.test(html), 'lang="id" hilang');

// Foto: tiap <img> beralt, berkas tidak berlebihan, data/foto.ts dan public/foto saling cocok, kredit tampil bila wajib
const gambar = [...html.matchAll(/<img\b[^>]*>/g)].map((m) => m[0]);
cek(gambar.length >= 10, `foto di HTML hanya ${gambar.length}`);
for (const g of gambar) cek(/\salt="[^"]+"/.test(g), `<img> tanpa alt: ${g.slice(0, 80)}`);
const dataFoto = readFileSync('src/data/foto.ts', 'utf8');
let totalKb = 0;
for (const b of readdirSync('public/foto')) {
  const kb = statSync(join('public/foto', b)).size / 1024;
  totalKb += kb;
  cek(kb <= 400, `foto ${b} ${Math.round(kb)} KB (maksimum 400)`);
  cek(dataFoto.includes(`'${b.replace(/\.jpg$/, '')}'`), `berkas ${b} tidak dipakai di src/data/foto.ts`);
}
cek(totalKb <= 3072, `total foto ${Math.round(totalKb)} KB (maksimum 3072)`);
const fotoContoh = (dataFoto.match(/contoh\('/g) || []).length;
cek(fotoContoh === 0 || html.includes('Kredit foto contoh'), 'ada foto contoh berlisensi CC tetapi blok kreditnya tidak tampil');
cek(fotoContoh === 0 || (html.match(/Foto contoh/g) || []).length >= 3, 'penanda "Foto contoh" tidak tampil pada foto');

// Aturan oXe: satu warna isian, garis bukan bayangan, hampir tanpa radius
cek(!/box-shadow:\s*(?!none|0 0 #0000)[^;}]*\d/.test(cssBuild.replace(/--tw-[a-z-]+:[^;]*;/g, '')), 'ada box-shadow nyata (oXe: garis, bukan bayangan)');
cek(!/\b(amber|orange|purple|violet|pink|rose)\b/i.test(cssBuild.replace(/:root[^}]*\}/g, (m) => m)), 'nama warna di luar palet oXe ditemukan di CSS');
cek(!/\p{Emoji_Presentation}|️/u.test(html), 'emoji ditemukan di HTML');
for (const k of ['solusi terbaik', 'berkualitas tinggi', 'kualitas terbaik', 'profesional dan terpercaya', 'terdepan'])
  cek(!html.toLowerCase().includes(k), `frasa klise: "${k}"`);

// Token: blok @theme (terang) dan blok :root[data-tema='gelap'] (gelap, dinyalakan Toggle di footer)
const ambil = (blok) => Object.fromEntries([...blok.matchAll(/--color-([a-z-]+):\s*([^;]+);/g)].map(([, n, v]) => [n, v.trim()]));
const terang = ambil(sumber.slice(sumber.indexOf('@theme {'), sumber.indexOf(':root {')));
const iGelap = sumber.indexOf(":root[data-tema='gelap']");
const gelap = { ...terang, ...ambil(sumber.slice(iGelap, sumber.indexOf('html {', iGelap))) };
const rgb = (v) => {
  const h = v.match(/^#([0-9a-f]{6})$/i);
  if (h) return { c: [0, 2, 4].map((i) => parseInt(h[1].slice(i, i + 2), 16)), a: 1 };
  const m = v.match(/rgb\(\s*(\d+)\s+(\d+)\s+(\d+)\s*\/\s*([\d.]+)\s*\)/);
  if (m) return { c: [+m[1], +m[2], +m[3]], a: +m[4] };
  throw new Error(`nilai warna tak terbaca: ${v}`);
};
const lin = (v) => ((v /= 255) <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
const lum = ([r, g, b]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
const tampak = (tema, fg, bg) => {
  const B = rgb(tema[bg]).c;
  const F = rgb(tema[fg]);
  return F.c.map((c, i) => Math.round(c * F.a + B[i] * (1 - F.a)));
};
const dasar = (tema, nama, di) => {
  const l = rgb(tema[nama]);
  return l.a === 1 ? l.c : tampak(tema, nama, di); // wash: komposit di atas bg
};
const rasio = (tema, fg, bg, alas = 'bg') => {
  const B = dasar(tema, bg, alas);
  const F = rgb(tema[fg]).a === 1 ? rgb(tema[fg]).c : (() => { const f = rgb(tema[fg]); return f.c.map((c, i) => Math.round(c * f.a + B[i] * (1 - f.a))); })();
  const [x, y] = [lum(F), lum(B)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
};
const pasangan = [
  // teks >= 4,5:1
  ['ink', 'bg'], ['ink', 'surface'], ['ink', 'surface-strong'], ['ink-muted', 'bg'], ['ink-muted', 'surface'],
  ['on-blue', 'blue'], ['blue-ink', 'bg'], ['blue-ink', 'surface'], ['blue-ink', 'blue-wash'],
  ['teal', 'teal-wash'], ['green', 'green-wash'], ['red', 'red-wash'],
  // non-teks (isian, fokus, garis penting) >= 3:1
  ['blue', 'bg', 3], ['ink-faint', 'bg', 3],
];
for (const [nama, tema] of [['terang', terang], ['gelap', gelap]])
  for (const [f, b, min = 4.5] of pasangan) {
    const r = rasio(tema, f, b);
    cek(r >= min, `[${nama}] kontras ${f} di atas ${b} hanya ${r.toFixed(2)}:1 (minimal ${min})`);
  }

// Hitungan jarak: Gresik–Surabaya sekitar 14 km garis lurus, Gresik–Malang sekitar 91 km
const km = (kota) => Number(html.match(new RegExp(`aria-label="Jarak garis lurus[^"]*?${kota} (\\d+) km`))?.[1]);
cek(km('Surabaya') >= 10 && km('Surabaya') <= 20, `jarak Surabaya tidak masuk akal: ${km('Surabaya')} km`);
cek(km('Malang') >= 80 && km('Malang') <= 100, `jarak Malang tidak masuk akal: ${km('Malang')} km`);

if (gagal.length) {
  console.error('GAGAL:\n- ' + gagal.join('\n- '));
  process.exit(1);
}
console.log(`Lulus. ${Object.keys(terang).length} token warna x 2 tema, ${ids.size} id, ${(html.length / 1024).toFixed(0)} KB HTML.`);

// Pengingat, bukan kegagalan: isi yang masih milik pemilik
const sisa = (html.match(/XXXX/g) || []).length;
if (sisa) console.log(`Belum diisi: ${sisa} tempat bertanda XXXX (WhatsApp, email, alamat di src/data/site.ts).`);
if (html.includes('Contoh isi')) console.log('Belum diganti: testimoni masih contoh (src/data/site.ts; set contoh: false setelah diganti).');
if (fotoContoh) console.log(`Belum diganti: ${fotoContoh} foto masih contoh dari Wikimedia Commons (public/foto + src/data/foto.ts).`);
