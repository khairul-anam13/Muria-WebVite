// Potongan kecil yang dipakai lintas bagian: tanda merek, pembungkus bagian, dan nilai mono di dalam prosa.
import type { ReactNode } from 'react';
import { cx } from '@/lib/cx';

/** Tanda sementara (belum ada logo): persegi biru dengan retak putih. */
export function Tanda({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className}>
      <rect width="32" height="32" rx="2" className="fill-blue" />
      <path d="M18 3l-3.5 8 5 4.5-4.5 6.5 3.5 4.5-2 3.5" fill="none" className="stroke-on-blue" strokeWidth="3" />
    </svg>
  );
}

/** Bagian halaman: garis rambut di atas, ruang lega, judul (opsional) dengan paragraf pembuka. */
export function Bagian({
  id,
  judul,
  lead,
  className,
  children,
}: {
  id: string;
  judul?: string;
  lead?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={cx('border-t border-line py-16 md:py-24', className)}>
      <div className="wadah">
        {judul && (
          <div className="mb-10 grid gap-x-12 gap-y-4 md:mb-14 lg:grid-cols-12 lg:items-end">
            <h2 className="t-display-2 md:t-display-1 lg:col-span-7">{judul}</h2>
            {lead && <p className="t-lead max-w-[46ch] text-ink-muted lg:col-span-5">{lead}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

// Angka berikut satuannya, ID retak, kode standar, dan tahun ditulis mono: di oXe, nilai selalu mono, kalimat selalu sans.
const NILAI = /(\b\d+(?:[.,]\d+)?(?:\s?[×x]\s?\d+(?:[.,]\d+)?)*\s?(?:mm|cm|km|m|L|jam|kg|%)(?!\p{L})|\bR-\d{2}\b|\bACI\s\d+R?\b|\b(?:19|20)\d{2}\b)/gu;
export function Angka({ children }: { children: string }) {
  return (
    <>
      {children.split(NILAI).map((s, i) =>
        i % 2 ? (
          <span key={i} className="font-mono text-[0.93em] font-medium tabular-nums">
            {s}
          </span>
        ) : (
          s
        ),
      )}
    </>
  );
}
