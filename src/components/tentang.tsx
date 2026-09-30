import { foto } from '@/data/foto';
import { misi, tahap, visi } from '@/data/site';
import { Angka, Bagian } from './dasar';
import { Foto } from './foto';
import { Panel, Tag } from './oxe';

export function Tentang() {
  return (
    <Bagian id="tentang" judul="Kota semen. Beton yang mulai lelah.">
      <div className="grid gap-x-12 gap-y-5 lg:grid-cols-2">
        <p className="max-w-[58ch]">
          <Angka>
            Pabrik, gudang, dermaga, tangki, dan jalan lingkungan di Gresik hampir seluruhnya beton, dan bekerja di udara pesisir yang
            lembap dan berkadar garam. Angka 0,3 mm, kira-kira tiga helai rambut, dipakai ACI 224R sebagai batas lebar retak untuk beton
            di lingkungan lembap. Lewat dari itu, air dan klorida makin mudah mencapai tulangan.
          </Angka>
        </p>
        <p className="max-w-[58ch]">
          <Angka>
            Pemilik bangunan biasanya hanya melihat dua pilihan: membiarkan, atau membongkar. CV Muria Struktura Teknik berdiri di Gresik
            pada 2025 untuk pilihan ketiga, memperbaiki yang sudah berdiri, pada proyek kecil sampai besar. Aturan kami sama di semuanya:
            retak dipetakan sebelum dibor, resin dicatat sesudah disuntik.
          </Angka>
        </p>
      </div>

      <figure className="mt-12">
        <Foto f={foto.banner} rasio="aspect-[16/9] md:aspect-[1600/686]" />
        <figcaption className="t-caption mt-2 text-ink-muted">{foto.banner.ket}.</figcaption>
      </figure>

      <div className="mt-16 flex flex-wrap items-center gap-x-4 gap-y-2">
        <h3 className="t-title text-ink-muted">Dari retak sehalus rambut sampai beton mengelupas</h3>
        {foto.tahap.some((f) => f.contoh) && <Tag>Foto contoh</Tag>}
      </div>
      <ol className="mt-5 grid grid-cols-2 gap-x-5 gap-y-8 border-t border-line pt-6 md:grid-cols-3 lg:grid-cols-5">
        {tahap.map((t, i) => (
          <li key={t.judul}>
            <Foto f={foto.tahap[i]} rasio="aspect-[4/3]" tanda={false} />
            <Tag tone={i === tahap.length - 1 ? 'blue' : 'neutral'} className="mt-3">
              Tahap {i + 1}
            </Tag>
            <h4 className="t-title mt-3">
              <Angka>{t.judul}</Angka>
            </h4>
            <p className="t-caption mt-1 text-ink-muted">
              <Angka>{t.isi}</Angka>
            </p>
          </li>
        ))}
      </ol>

      <div className="mt-20 grid gap-x-12 gap-y-12 lg:grid-cols-12">
        <Panel eyebrow="Visi" className="p-6 lg:col-span-6 lg:self-start">
          <p className="t-display-2 mt-1">{visi}</p>
        </Panel>
        <div className="lg:col-span-6">
          <h3 className="t-label text-ink-muted">Misi</h3>
          <ul className="mt-3 border-t border-line-strong">
            {misi.map((m) => (
              <li key={m.judul} className="border-b border-line py-4">
                <p className="t-title">{m.judul}</p>
                <p className="mt-1 max-w-[52ch] text-ink-muted">{m.isi}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Bagian>
  );
}
