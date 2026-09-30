import { kota, tampil, usaha } from '@/data/site';
import { Bagian } from './dasar';
import { JamKerja } from './jam-kerja';

export function Lokasi() {
  // ponytail: proyeksi datar lokal (1° lintang = 110,57 km; 1° bujur = 111,32·cos lintang km).
  // Cukup untuk < 150 km; pakai haversine bila jangkauan lebih jauh.
  const px = 2.5; // satuan gambar per km; lingkar terluar 100 km = 250
  const kmBujur = 111.32 * Math.cos((usaha.titik.lat * Math.PI) / 180);
  const titik = kota.map((k) => {
    const dx = (k.lon - usaha.titik.lon) * kmBujur;
    const dy = (k.lat - usaha.titik.lat) * 110.57;
    return { nama: k.nama, jarak: Math.round(Math.hypot(dx, dy)), x: dx * px, y: -dy * px };
  });
  const ringkas = titik.map((t) => `${t.nama} ${t.jarak} km`).join(', ');
  const mono = { fontFamily: 'var(--font-mono)' };

  return (
    <Bagian id="lokasi" judul="Basis di Gresik. Jangkauan Jawa Timur.">
      <div className="grid gap-x-16 gap-y-14 lg:grid-cols-12 lg:items-start">
        <figure className="lg:col-span-7">
          <div className="rounded-2 border border-line bg-surface p-4">
            <svg viewBox="-330 -292 660 592" role="img" aria-label={`Jarak garis lurus dari Gresik: ${ringkas}`} className="w-full">
              <g fill="none" className="stroke-line-strong" strokeWidth="1.2">
                <circle r="62.5" strokeDasharray="3 5" />
                <circle r="125" strokeDasharray="3 5" />
                <circle r="250" />
                <path d="M-262 0H262M0 -262V262" className="stroke-line" />
              </g>
              <g style={{ ...mono, fontSize: 'var(--fs-peta-kecil)', fontWeight: 500 }} className="fill-ink-muted">
                <text x="48" y="-48">25 km</text>
                <text x="92" y="-92">50 km</text>
                <text x="181" y="-181">100 km</text>
              </g>
              <g style={{ ...mono, fontSize: 'var(--fs-peta)', fontWeight: 600 }} className="fill-ink" textAnchor="middle">
                <text x="0" y="-268">U</text>
                <text x="272" y="6">T</text>
                <text x="0" y="284">S</text>
                <text x="-272" y="6">B</text>
              </g>
              {titik.map((t) => {
                const kiri = t.x < -40;
                return (
                  <g key={t.nama}>
                    <circle cx={t.x} cy={t.y} r="4" className="fill-ink" />
                    <text
                      x={t.x + (kiri ? -11 : 11)}
                      y={t.y + 5}
                      textAnchor={kiri ? 'end' : 'start'}
                      style={{ fontSize: 'var(--fs-peta)', fontWeight: 600 }}
                      className="fill-ink"
                    >
                      {t.nama}{' '}
                      <tspan style={{ ...mono, fontWeight: 500 }} className="fill-ink-muted">
                        {t.jarak}
                      </tspan>
                      <tspan dx="3" style={{ fontWeight: 400 }} className="fill-ink-muted">
                        km
                      </tspan>
                    </text>
                  </g>
                );
              })}
              <circle r="14" fill="none" className="stroke-blue" strokeWidth="2.5" />
              <circle r="5" className="fill-blue" />
              <text x="-18" y="30" textAnchor="end" style={{ ...mono, fontSize: 'var(--fs-peta)', fontWeight: 700 }} className="fill-blue-ink">
                GRESIK
              </text>
            </svg>
          </div>
          <figcaption className="t-caption mt-3 max-w-[60ch] text-ink-muted">
            Jarak garis lurus dari pusat kota Gresik ke kota tujuan, digambar sesuai skala. Jarak lewat jalan lebih jauh.
          </figcaption>
        </figure>

        <div className="lg:col-span-5">
          <h3 className="t-label text-ink-muted">Kantor</h3>
          <p className="t-lead mt-3 border-t border-line-strong pt-4">{tampil.alamat}</p>
          <p className="t-caption mt-2 max-w-[46ch] text-ink-muted">
            Pekerjaan lapangan menjangkau seluruh Jawa Timur. Proyek di luar provinsi dibahas per proyek.
          </p>
          <div className="mt-12">
            <JamKerja />
          </div>
        </div>
      </div>
    </Bagian>
  );
}
