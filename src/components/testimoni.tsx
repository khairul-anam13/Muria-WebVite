import { testimoni } from '@/data/site';
import { Angka, Bagian } from './dasar';
import { Banner, Tag } from './oxe';

function Kutipan({ t, besar }: { t: (typeof testimoni)[number]; besar?: boolean }) {
  return (
    <figure className={besar ? '' : 'border-t border-line-strong pt-6'}>
      <blockquote className={besar ? 't-display-2 md:text-[28px] md:leading-[34px]' : 't-lead'}>
        “<Angka>{t.kutip}</Angka>”
      </blockquote>
      <figcaption className="mt-5 flex items-start gap-3">
        <Tag>{t.id}</Tag>
        <span className="pt-0.5">
          <span className="t-body-strong block">
            {t.siapa}, {t.tempat}
          </span>
          <span className="t-caption block text-ink-muted">{t.pekerjaan}</span>
        </span>
      </figcaption>
    </figure>
  );
}

export function Testimoni() {
  const [utama, ...lain] = testimoni;
  return (
    <Bagian id="testimoni" judul="Setelah serah terima">
      {testimoni.some((t) => t.contoh) && (
        <Banner tone="warning" title="Contoh isi" className="mb-12 max-w-[640px]">
          Ketiga kutipan di bawah adalah contoh format. Ganti dengan kutipan klien asli sebelum situs tayang.
        </Banner>
      )}
      <div className="grid gap-x-16 gap-y-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Kutipan t={utama} besar />
        </div>
        <div className="grid gap-12 lg:col-span-5">
          {lain.map((t) => (
            <Kutipan key={t.id} t={t} />
          ))}
        </div>
      </div>
    </Bagian>
  );
}
