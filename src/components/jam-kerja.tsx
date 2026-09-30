// Jam kerja dengan status "buka/tutup sekarang" menurut WIB, berapa pun zona waktu pengunjung.
import { useEffect, useState } from 'react';
import { jam } from '@/data/site';
import { cx } from '@/lib/cx';
import { Tag } from './oxe';

const wib = () => {
  const d = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }));
  return { hari: d.getDay(), menit: d.getHours() * 60 + d.getMinutes() };
};

export function JamKerja() {
  // null sampai terpasang di browser, supaya HTML server dan klien identik (tanpa selisih hidrasi)
  const [kini, setKini] = useState<ReturnType<typeof wib> | null>(null);
  useEffect(() => {
    setKini(wib());
    const t = setInterval(() => setKini(wib()), 60_000);
    return () => clearInterval(t);
  }, []);
  const buka = kini && jam.some((j) => j.hari.includes(kini.hari) && kini.menit >= j.mulai && kini.menit < j.selesai);
  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h3 className="t-label text-ink-muted">Jam kerja</h3>
        <span className="h-7 min-w-[9rem] text-right">
          {kini && <Tag tone={buka ? 'green' : 'neutral'}>{buka ? 'Buka sekarang' : 'Tutup sekarang'}</Tag>}
        </span>
      </div>
      <table className="mt-3 w-full border-t border-line-strong">
        <tbody>
          {jam.map((j) => (
            <tr
              key={j.nama}
              aria-current={kini && j.hari.includes(kini.hari) ? 'date' : undefined}
              className={cx('border-b border-line', kini && j.hari.includes(kini.hari) && 'bg-blue-wash')}
            >
              <th scope="row" className="px-3 py-3 text-left font-normal">
                {j.nama}
              </th>
              <td className="t-value px-3 py-3 text-right whitespace-nowrap">{j.waktu}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="t-caption mt-4 max-w-[46ch] text-ink-muted">
        Semua jam dalam WIB. Di luar jam kerja, pesan WhatsApp tetap dibaca dan dibalas pada hari kerja berikutnya. Inspeksi lapangan bisa
        dijadwalkan di luar jam ini.
      </p>
    </div>
  );
}
