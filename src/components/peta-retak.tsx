// Denah lantai contoh dengan retak yang sudah diinjeksi. Panjang tiap retak diambil dari data berita
// acara yang sama dengan tabelnya, jadi gambar dan angka tidak bisa saling bertentangan.
import { beritaAcara } from '@/data/site';
import { lebar, retak, type Pt } from '@/lib/retak';

const M = 60; // 1 m = 60 satuan gambar; lantai 6 × 4 m
const susun: Record<string, { dari: Pt; sudut: number; seed: number; plat: Pt }> = {
  'R-01': { dari: [210, 45], sudut: 90, seed: 4, plat: [230, 96] }, // menyusuri sambungan susut
  'R-02': { dari: [55, 72], sudut: 35, seed: 8, plat: [104, 62] },
  'R-03': { dari: [60, 250], sudut: -1, seed: 15, plat: [96, 214] },
  'R-04': { dari: [330, 60], sudut: 100, seed: 22, plat: [262, 64] },
};

export function PetaRetak() {
  const garis = beritaAcara.map((r) => {
    const c = susun[r.id];
    const rad = (c.sudut * Math.PI) / 180;
    const p = (r.panjang * M) / 1.03; // garis berkelok sedikit lebih panjang dari jarak lurusnya
    const ke: Pt = [c.dari[0] + Math.cos(rad) * p, c.dari[1] + Math.sin(rad) * p];
    const titik = retak(c.seed, c.dari, ke, Math.max(5, Math.round(r.panjang * 2.4)), 4);
    return { id: r.id, titik, packer: titik.filter((_, i) => i > 0 && i < titik.length - 1 && i % 2 === 0), plat: c.plat };
  });
  return (
    <figure className="max-w-[44rem]">
      <div className="rounded-2 border border-line bg-surface p-4">
        <svg
          viewBox="0 0 420 330"
          role="img"
          aria-label="Denah lantai gudang 6 kali 4 meter berisi empat retak R-01 sampai R-04 yang sudah diinjeksi, masing-masing dengan packer"
          className="w-full"
        >
          <rect x="30" y="30" width="360" height="240" className="fill-bg stroke-ink" strokeWidth="2" />
          <path d="M210 30V270" fill="none" className="stroke-ink-muted" strokeWidth="1.6" strokeDasharray="10 4 2 4" />
          {garis.map(({ id, titik, packer }, i) => (
            <g key={id}>
              <path d={lebar(titik, 8, i + 3)} className="fill-ink" />
              <path d={lebar(titik, 4, i + 3)} className="fill-blue" />
              {packer.map(([x, y]) => (
                <circle key={`${x}-${y}`} cx={x} cy={y} r="4.5" className="fill-bg stroke-ink" strokeWidth="1.5" />
              ))}
            </g>
          ))}
          {garis.map(({ id, titik, plat: [x, y] }) => {
            // garis penunjuk dari pelat ke titik retak terdekat
            const jarak = (p: Pt) => Math.hypot(p[0] - x - 24, p[1] - y - 11);
            const [tx, ty] = titik.reduce((a, b) => (jarak(b) < jarak(a) ? b : a));
            return (
              <g key={`p${id}`}>
                <path d={`M${x + 24} ${y + 11}L${tx} ${ty}`} fill="none" className="stroke-ink-muted" strokeWidth="1.4" />
                <path d={`M${x} ${y}h48v22h-42l-6-6z`} className="fill-ink" />
                <text x={x + 7} y={y + 16.5} style={{ font: '600 14px var(--font-mono)' }} className="fill-bg">
                  {id}
                </text>
              </g>
            );
          })}
          <path d="M30 304h60M30 298v12M90 298v12" fill="none" className="stroke-ink" strokeWidth="1.6" />
          <text x="100" y="309" style={{ font: '600 15px var(--font-mono)' }} className="fill-ink">
            1 m
          </text>
        </svg>
      </div>
      <figcaption className="t-caption mt-3 max-w-[58ch] text-ink-muted">
        Contoh denah lantai gudang 6 × 4 m. Garis biru adalah retak yang sudah diinjeksi, titik adalah packer, garis putus adalah
        sambungan susut lantai. Panjang gambar mengikuti tabel di bawahnya.
      </figcaption>
    </figure>
  );
}
