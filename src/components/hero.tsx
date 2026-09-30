import { angka, persen, pesanInspeksi, ringkasBerita, usaha, wa } from '@/data/site';
import { foto } from '@/data/foto';
import { Foto } from './foto';
import { Meter, Panel, StatReadout, Tag, tombol } from './oxe';

export function Hero() {
  const b = ringkasBerita();
  // skala batang 0–140% dari volume teoretis; garis kelima dari tujuh pembagi menandai 100%
  const skala = ((b.terpakai / b.teori) * 100) / 1.4;
  return (
    <section id="beranda" className="kisi-titik">
      <div className="wadah grid gap-14 py-16 md:py-24 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-7">
          <Tag tone="blue">Concrete solution</Tag>
          <h1 className="t-hero mt-6">
            <span className="block">Retak dipetakan.</span>
            <span className="block">Resin disuntik.</span>
            <span className="block">Setiap liter dibukukan.</span>
          </h1>
          <p className="t-lead mt-6 max-w-[52ch] text-ink-muted">
            CV Muria Struktura Teknik memperbaiki beton retak, patah, dan rusak, dari sambungan lantai gudang sampai kolom pabrik yang
            perlu dibalut carbon fiber. Berbasis di Gresik untuk proyek kecil hingga besar di Jawa Timur.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={wa(pesanInspeksi)} className={tombol('lg', 'solid')}>
              Minta inspeksi
            </a>
            <a href="#cara-kerja" className={tombol('lg', 'outline')}>
              Lihat cara kerja
            </a>
          </div>
          <dl className="mt-12 grid max-w-[520px] grid-cols-3 gap-6 border-t border-line pt-6">
            {[
              ['Kantor', usaha.kota, false],
              ['Berdiri', String(usaha.berdiri), true],
              ['Skala proyek', usaha.skala, false],
            ].map(([k, v, mono]) => (
              <div key={k as string}>
                <dt className="t-label text-ink-muted">{k}</dt>
                <dd className={mono ? 't-value mt-1 text-ink' : 't-body-strong mt-1'}>{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="lg:col-span-5">
          <Foto f={foto.hero} rasio="aspect-[4/5]" priority />
          {/* panel menumpang di tepi bawah foto: retak halus di foto, angka di panel */}
          <Panel eyebrow="Berita acara" title="Lantai gudang, 4 retak" className="relative z-10 mx-3 -mt-16 p-6 lg:-ml-14 lg:mr-0 lg:-mt-24">
            <Tag tone="blue" className="absolute top-4 right-4">
              Contoh
            </Tag>
            <div className="mt-8 flex flex-col gap-8">
              <StatReadout
                label="Resin terpakai"
                value={angka(b.terpakai)}
                unit="L"
                note={`Teoretis ${angka(b.teori)} L`}
              />
              <Meter label="Terpakai dibanding teoretis" value={skala} display={`${Math.round((b.terpakai / b.teori) * 100)}% (${persen(b.selisih)})`} />
            </div>
            <p className="t-caption mt-8 text-ink-muted">
              Selisih di atas nol wajar: resin tersisa di packer dan selang, dan meresap ke pori beton. Selisih negatif berarti retak belum
              terisi penuh. Batang penuh mewakili 140% dari volume teoretis.
            </p>
          </Panel>
        </div>
      </div>
    </section>
  );
}
