import { foto } from '@/data/foto';
import { legalitas, organisasi, type Simpul } from '@/data/site';
import { cx } from '@/lib/cx';
import { Bagian } from './dasar';
import { Foto } from './foto';
import { Tag } from './oxe';

/** Satu simpul bagan organisasi; garisnya rambut 1px. Rekursif untuk anak. */
function Node({ n, akar }: { n: Simpul; akar?: boolean }) {
  return (
    <li
      className={cx(
        'relative',
        !akar &&
          'before:absolute before:-left-6 before:top-0 before:h-[19px] before:w-6 before:border-b before:border-l before:border-line-strong [&:not(:last-child)]:after:absolute [&:not(:last-child)]:after:-left-6 [&:not(:last-child)]:after:top-0 [&:not(:last-child)]:after:h-full [&:not(:last-child)]:after:w-px [&:not(:last-child)]:after:bg-line-strong',
      )}
    >
      <div className="py-2">
        <p className="t-title">{n.nama}</p>
        <p className="t-caption max-w-[46ch] text-ink-muted">{n.tugas}</p>
      </div>
      {n.anak && (
        <ol className="ml-3 pl-6">
          {n.anak.map((a) => (
            <Node key={a.nama} n={a} />
          ))}
        </ol>
      )}
    </li>
  );
}

export function BadanUsaha() {
  return (
    <Bagian id="badan-usaha" judul="Berkas lengkap. Orang yang jelas.">
      <div className="grid gap-x-16 gap-y-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h3 className="t-label text-ink-muted">Legalitas</h3>
          <ul className="mt-3 border-t border-line-strong">
            {legalitas.map((l) => (
              <li key={l.nama} className="flex items-start justify-between gap-4 border-b border-line py-4">
                <div>
                  <p className="t-body-strong">{l.nama}</p>
                  <p className="t-caption mt-0.5 max-w-[40ch] text-ink-muted">{l.isi}</p>
                </div>
                <Tag tone="green" className="flex-none">
                  Ada
                </Tag>
              </li>
            ))}
          </ul>
          <p className="t-caption mt-4 max-w-[44ch] text-ink-muted">Salinan dokumen bisa diminta untuk kelengkapan penawaran atau prakualifikasi.</p>
        </div>

        <div className="lg:col-span-7">
          <figure>
            <Foto f={foto.tim} rasio="aspect-[3/2] md:aspect-[16/9]" posisi="object-[50%_15%]" />
            <figcaption className="t-caption mt-2 text-ink-muted">{foto.tim.ket}.</figcaption>
          </figure>
          <h3 className="t-label mt-12 text-ink-muted">Struktur organisasi</h3>
          <ol className="mt-3 border-t border-line-strong pt-2">
            <Node n={organisasi} akar />
          </ol>
        </div>
      </div>
    </Bagian>
  );
}
