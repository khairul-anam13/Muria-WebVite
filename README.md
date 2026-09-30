# Muria-vite

Situs profil CV Muria Struktura Teknik (Gresik). Vite 8 + React 19 + TypeScript + Tailwind CSS v4, satu halaman statis yang diprerender. Tampilan memakai **oXe Design** dengan base colour biru dan konsep bersih. Isi dan desainnya sama dengan `Muria-next`; yang berbeda hanya mesin build.

```bash
npm install --os=win32 --cpu=x64   # lihat catatan npm di bawah
npm run dev                        # http://localhost:5173, dirender di browser
npm run build                      # tipe, build klien, build SSR, prerender ke dist/
npm run preview                    # menyajikan dist/ di http://localhost:4173
npm run cek                        # build + pemeriksaan struktur, aturan oXe, kontras dua tema, foto, hitungan jarak
```

## Cara build (beda dari Next)

Vite tidak punya render server bawaan, padahal situs profil perlu HTML yang terbaca mesin pencari dan pratinjau tautan. Karena itu `npm run build` menjalankan empat langkah:

1. `tsc --noEmit` memeriksa tipe.
2. `vite build` membangun paket klien ke `dist/`.
3. `vite build --ssr src/entry-server.tsx` membangun `dist-ssr/entry-server.js`.
4. `scripts/prerender.mjs` merender `<App />` menjadi HTML, menanamnya di `dist/index.html` (menggantikan penanda `<!--app-->`), lalu menghapus `dist-ssr`.

Hasilnya HTML lengkap yang langsung tampil, lalu React menghidupkannya di browser (`hydrateRoot` di `src/entry-client.tsx`). Di `npm run dev`, `#root` dirender di browser seperti biasa. Keluaran `dist/` adalah berkas statis; untuk hosting di subfolder (mis. GitHub Pages) atur `base` di `vite.config.ts`.

Tidak ada pengoptimal gambar seperti `next/image`. Foto di `public/foto` sudah dipangkas ke ukuran tampil terbesarnya dan disajikan apa adanya (JPEG), dimuat malas kecuali foto hero.

## oXe Design di sini

Sumbernya: oXe Design di akun Claude Design Anda (`project/tokens.json`, `project/README.md`, `project/components/*`). Diterapkan apa adanya kecuali yang tertulis di bawah.

| Dari oXe | Di proyek ini |
|---|---|
| Token warna, skala tipe, radius, ukuran kontrol | `src/index.css` (`@theme` Tailwind); palet bawaan Tailwind, bayangan, dan radius bawaan dibuang, sehingga hanya token oXe yang bisa dipakai |
| Button, Tag, Field, Panel, Meter, StatReadout, Banner | `src/components/oxe.tsx` (TSX + Tailwind, perilaku sama dengan `bundle.js`) |
| Tabs | `src/components/tabs.tsx`, ditambah navigasi panah/Home/End dan pengait ARIA ke panelnya |
| Toggle | `src/components/tema-toggle.tsx`: sakelar tema gelap di footer |
| IBM Plex Sans + Mono | paket `@fontsource`, dibundel Vite (hanya subset latin) |

**Yang berubah dari oXe (disengaja):**

1. **Warna isian tunggal amber diganti biru** (`amber`, `amber-ink`, `amber-wash`, `on-amber` menjadi `blue`, `blue-ink`, `blue-wash`, `on-blue`). Aturan oXe tetap: biru satu-satunya isian penuh; teal, hijau, merah hanya teks, titik, dan wash.
2. **Netral hangat diganti netral dingin** (kertas krem menjadi putih kebiruan, grafit hangat menjadi grafit dingin) agar selaras dengan biru.
3. **Tema gelap diturunkan mengikuti pola oXe.** Tampilan bawaan selalu terang; gelap hanya menyala lewat Toggle di footer (pilihan tersimpan di `localStorage`, tidak mengikuti pengaturan sistem). Kontras kedua tema dicek `npm run cek`.
4. **Dua gaya tipe ditambahkan** untuk halaman pemasaran, di luar `tokens.json`: `t-hero` (judul hingga 60px) dan `t-lead` (paragraf pembuka 17px). Keluarga dan bobot tetap milik oXe.

Aturan oXe yang dijaga: nilai (angka, satuan, ID retak, kode standar) selalu mono dan kalimat selalu sans; garis rambut 1px, tanpa bayangan; sudut 2 dan 4px; bulat hanya untuk titik status dan penanda Meter; siku sudut Panel hanya untuk wadah tingkat-atas.

## Foto

Ada **13 foto contoh** (pengganti sementara) yang dipasang di hero, banner Tentang, lima tahap kerusakan, lima layanan, dan bagian Badan usaha. Semuanya dari Wikimedia Commons berlisensi CC0, CC BY, atau CC BY-SA, boleh dipakai komersial dengan kredit. Kredit lengkap (judul, pembuat, lisensi, tautan sumber) tampil di footer selama masih ada foto contoh, dan tiap foto contoh diberi penanda "Foto contoh" agar tidak terlanjur tayang sebagai dokumentasi Muria. Total ± 1,4 MB.

Sebagian besar menampilkan kerusakan beton pada jembatan di Ontario, Kanada; itu cukup untuk gambaran tata letak, tetapi bukan proyek Muria dan bukan di Indonesia. Dua foto berlisensi BY-SA (banner dan perkuatan) mewajibkan hasil pangkasannya dibagikan dengan lisensi yang sama; itu sudah dinyatakan di kredit, dan tak berlaku lagi setelah foto diganti.

Mengganti dengan dokumentasi proyek asli, satu foto sekali jalan:

1. Timpa berkas di `public/foto/` dengan foto Anda, JPG, rasio dan ukuran sebagai berikut.
2. Di `src/data/foto.ts` ubah entrinya dari `contoh(...)` menjadi `asli('nama-berkas', lebar, tinggi, 'teks alt', 'keterangan')`.

Penanda dan kredit foto itu hilang otomatis; blok kredit di footer hilang setelah semua `contoh(...)` diganti.

| Foto | Berkas | Ukuran anjuran | Tampil sebagai |
|---|---|---|---|
| Hero | `hero-retak-halus.jpg` | 1000×1250 | potret 4:5, retak yang terlihat jelas dari dekat |
| Banner Tentang | `banner-lantai-gudang.jpg` | 1600×686 | lebar penuh, lokasi atau struktur khas Gresik |
| Lima tahap | `tahap-1…5-*.jpg` | 720×540 | 4:3, urutan dari retak halus sampai perbaikan |
| Lima layanan | `layanan-*.jpg` | 1040×736 | berdampingan dengan gambar teknik, tinggi sama |
| Tim | `tim-pelaksana.jpg` | 960×640 | 16:9 di bagian Badan usaha |

Karena tidak ada pengoptimal gambar, kompres foto asli sebelum dipakai (sekitar 200 KB per foto sudah cukup). Foto orang: minta persetujuan tertulis dari yang tampak jelas wajahnya sebelum tayang.

## Yang harus Anda isi

Semua isi ada di `src/data/site.ts`; komponen tidak perlu disentuh.

| Data | Sekarang | Aksi |
|---|---|---|
| `kontak.whatsapp`, `kontak.email`, `kontak.alamat` | kosong, tampil `XXXX` | isi; tombol WhatsApp dan formulir langsung berfungsi |
| `testimoni` | tiga **contoh**, ditandai Banner "Contoh isi" | ganti dengan kutipan klien asli, set `contoh: false` |
| `jam`, janji 1×24 jam, daftar alat dan material, bagan organisasi, wilayah layanan | tulisan saya, bukan dari file profil | periksa dan koreksi |
| Foto proyek | 13 foto contoh (lihat bagian Foto) | ganti dengan dokumentasi asli |
| Logo, `og:image` | belum ada (tanda sementara: persegi biru dengan retak) | tambahkan; judul dan deskripsi halaman ada di `index.html` |

`npm run cek` mengingatkan bila masih ada `XXXX`, testimoni contoh, atau foto contoh.

## Catatan npm di mesin ini

`~/.npmrc` berisi `os=linux`, sehingga `npm install` biasa memasang binary Linux (Rolldown, Tailwind, Lightning CSS) dan Vite gagal jalan di Windows ("Cannot find native binding"). Pakai `npm install --os=win32 --cpu=x64`. Jangan menaruh `.npmrc` berisi `os=win32` di proyek ini: build di Vercel/Netlify (Linux) akan rusak. `package-lock.json` sudah memuat binary Linux dan Windows.
