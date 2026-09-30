// Foto berbingkai oXe: garis rambut 1px, sudut 2px, tanpa bayangan. Penanda "Foto contoh" hilang setelah diganti dengan asli().
// <img> biasa: berkas di public/foto sudah dipangkas ke ukuran tampil terbesarnya, jadi tanpa srcset.
import type { Foto as DataFoto } from '@/data/foto';
import { cx } from '@/lib/cx';
import { Tag } from './oxe';

export function Foto({
  f,
  priority,
  rasio,
  isi,
  posisi = 'object-center',
  tanda = true,
  className,
}: {
  f: DataFoto;
  /** foto di atas lipatan (hero): dimuat segera dan diprioritaskan */
  priority?: boolean;
  /** kelas rasio, mis. aspect-[4/5]; abaikan bila isi */
  rasio?: string;
  /** mengisi tinggi induk (grid yang meregang) alih-alih rasio tetap */
  isi?: boolean;
  /** kelas object-position bila bagian penting foto ada di atas atau bawah, mis. object-[50%_18%] */
  posisi?: string;
  tanda?: boolean;
  className?: string;
}) {
  return (
    <div className={cx('relative overflow-hidden rounded-2 border border-line bg-surface', isi ? 'min-h-56' : rasio, className)}>
      <img
        src={f.src}
        alt={f.alt}
        width={f.w}
        height={f.h}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
        decoding="async"
        className={cx('foto-img object-cover', isi ? 'absolute inset-0 size-full' : 'size-full', posisi)}
      />
      {tanda && f.contoh && <Tag className="absolute top-3 left-3">Foto contoh</Tag>}
    </div>
  );
}
