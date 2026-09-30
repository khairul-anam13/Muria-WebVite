// oXe Design, diportasi dari project/components/bundle.js ke TSX + Tailwind.
// Aturan sistem: satu warna isian (biru), sudut 2-4px, garis 1px tanpa bayangan, nilai mono dan kalimat sans.
import type { ButtonHTMLAttributes, HTMLAttributes, InputHTMLAttributes, ReactNode } from 'react';
import { cx } from '@/lib/cx';

/* ---------- Button ---------- */
type Ukuran = 'sm' | 'md' | 'lg';
type Varian = 'solid' | 'outline' | 'ghost';
const ukuran: Record<Ukuran, string> = {
  sm: 'h-7 px-3 text-[13px] tracking-[0.01em]',
  md: 'h-9 px-4 text-[14px] tracking-[0.01em]',
  lg: 'h-11 px-6 text-[15px]',
};
const varian: Record<Varian, string> = {
  solid: 'border-blue bg-blue text-on-blue hover:bg-[color-mix(in_srgb,var(--color-blue)_90%,var(--color-ink))] active:opacity-75',
  outline: 'border-line-strong bg-transparent text-ink hover:border-ink-faint hover:bg-surface',
  ghost: 'border-transparent bg-transparent text-ink hover:bg-surface',
};
/** Kelas tombol oXe. Dipakai juga pada <a> yang tampil sebagai tombol. */
export const tombol = (size: Ukuran = 'md', variant: Varian = 'outline', extra?: string) =>
  cx(
    'inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-1 border font-semibold transition-colors duration-100 disabled:cursor-default disabled:opacity-[0.42]',
    ukuran[size],
    varian[variant],
    extra,
  );
export function Button({
  size,
  variant,
  className,
  ...p
}: ButtonHTMLAttributes<HTMLButtonElement> & { size?: Ukuran; variant?: Varian }) {
  return <button type="button" {...p} className={tombol(size, variant, className)} />;
}

/* ---------- Tag ---------- */
const nada = {
  neutral: 'border-line bg-surface text-ink-muted',
  blue: 'border-transparent bg-blue-wash text-blue-ink',
  teal: 'border-transparent bg-teal-wash text-teal',
  green: 'border-transparent bg-green-wash text-green',
  red: 'border-transparent bg-red-wash text-red',
};
export function Tag({ tone = 'neutral', className, children }: { tone?: keyof typeof nada; className?: string; children: ReactNode }) {
  return (
    <span className={cx('t-label inline-flex h-7 shrink-0 items-center gap-1 rounded-1 border pr-2 pl-1 whitespace-nowrap', nada[tone], className)}>
      <span className="size-1.5 flex-none rounded-round bg-current" aria-hidden="true" />
      {children}
    </span>
  );
}

/* ---------- Field ---------- */
export function Field({
  id,
  label,
  help,
  suffix,
  invalid,
  className,
  ...input
}: InputHTMLAttributes<HTMLInputElement> & { id: string; label: ReactNode; help?: ReactNode; suffix?: ReactNode; invalid?: boolean }) {
  return (
    <div className={cx('flex w-full flex-col gap-1', className)}>
      <label htmlFor={id} className="t-label text-ink-muted">
        {label}
      </label>
      <div
        className={cx(
          'flex h-11 items-center gap-2 rounded-1 border px-3 transition-colors duration-100 focus-within:border-blue focus-within:bg-blue-wash',
          invalid ? 'border-red bg-red-wash' : 'border-line bg-surface',
        )}
      >
        <input
          id={id}
          aria-invalid={invalid || undefined}
          aria-describedby={help ? `${id}-bantuan` : undefined}
          className="min-w-0 flex-1 border-0 bg-transparent font-mono text-[13px] font-medium text-ink outline-0 placeholder:font-sans placeholder:font-normal placeholder:text-ink-muted"
          {...input}
        />
        {suffix && <span className="t-micro flex-none text-ink-muted">{suffix}</span>}
      </div>
      {help && (
        <p id={`${id}-bantuan`} className={cx('t-caption', invalid ? 'text-red' : 'text-ink-muted')}>
          {help}
        </p>
      )}
    </div>
  );
}

/* ---------- Panel ---------- */
const siku = {
  tl: '-top-px -left-px border-t border-l',
  tr: '-top-px -right-px border-t border-r',
  bl: '-bottom-px -left-px border-b border-l',
  br: '-right-px -bottom-px border-r border-b',
};
/** Siku sudut hanya untuk wadah tingkat-atas; panel bersarang memakai bracket={false}. */
export function Panel({
  eyebrow,
  title,
  bracket = true,
  className,
  children,
  ...p
}: Omit<HTMLAttributes<HTMLDivElement>, 'title'> & { eyebrow?: ReactNode; title?: ReactNode; bracket?: boolean }) {
  return (
    <div {...p} className={cx('relative rounded-2 border border-line bg-surface p-4', className)}>
      {bracket &&
        (Object.keys(siku) as Array<keyof typeof siku>).map((k) => (
          <span key={k} aria-hidden="true" className={cx('pointer-events-none absolute size-[9px] border-line-strong', siku[k])} />
        ))}
      {eyebrow && <p className="t-label mb-1 text-blue-ink">{eyebrow}</p>}
      {title && <h3 className="t-title text-ink">{title}</h3>}
      {children}
    </div>
  );
}

/* ---------- Meter ---------- */
export function Meter({
  value,
  label,
  display,
  tone = 'blue',
  ticks = true,
  className,
}: {
  value: number;
  label?: ReactNode;
  display?: ReactNode;
  tone?: 'blue' | 'teal';
  ticks?: boolean;
  className?: string;
}) {
  const v = Math.max(0, Math.min(100, value));
  const warna = tone === 'teal' ? { isi: 'bg-teal', tanda: 'border-teal' } : { isi: 'bg-blue', tanda: 'border-blue' };
  return (
    <div className={cx('flex w-full flex-col gap-2', className)}>
      {(label || display != null) && (
        <div className="flex items-baseline justify-between gap-2">
          <span className="t-label text-ink">{label}</span>
          <span className="t-value">{display ?? `${Math.round(v)}%`}</span>
        </div>
      )}
      <div
        role="meter"
        aria-label={typeof label === 'string' ? label : undefined}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(v)}
        className="relative h-2 rounded-1 bg-surface-strong"
      >
        <div className={cx('relative h-full rounded-1', warna.isi)} style={{ width: `${v}%` }}>
          <span className={cx('absolute top-1/2 -right-[5px] size-2.5 -translate-y-1/2 rounded-round border-2 bg-bg', warna.tanda)} />
        </div>
        {ticks && (
          <div className="pointer-events-none absolute inset-0 flex justify-between" aria-hidden="true">
            {Array.from({ length: 8 }, (_, i) => (
              <span key={i} className="h-full w-px bg-bg opacity-50" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- StatReadout ---------- */
export function StatReadout({ label, value, unit, note, className }: { label?: ReactNode; value: ReactNode; unit?: ReactNode; note?: ReactNode; className?: string }) {
  return (
    <div className={cx('flex flex-col gap-1', className)}>
      {label && <span className="t-label text-ink-muted">{label}</span>}
      <div className="t-stat flex items-baseline gap-1 text-ink">
        {value}
        {unit && <span className="font-mono text-[15px] font-normal tracking-normal text-ink-muted">{unit}</span>}
      </div>
      {note && <div className="t-micro text-ink-muted">{note}</div>}
    </div>
  );
}

/* ---------- Banner ---------- */
const nadaBanner = {
  info: { latar: 'bg-teal-wash', titik: 'bg-teal' },
  success: { latar: 'bg-green-wash', titik: 'bg-green' },
  warning: { latar: 'bg-blue-wash', titik: 'bg-blue-ink' },
  danger: { latar: 'bg-red-wash', titik: 'bg-red' },
};
export function Banner({ tone = 'info', title, className, children }: { tone?: keyof typeof nadaBanner; title?: ReactNode; className?: string; children?: ReactNode }) {
  return (
    <div role="status" className={cx('flex items-start gap-3 rounded-1 px-4 py-3', nadaBanner[tone].latar, className)}>
      <span aria-hidden="true" className={cx('mt-[7px] size-2 flex-none rounded-round', nadaBanner[tone].titik)} />
      <div className="min-w-0 flex-1">
        {title && <p className="t-body-strong text-ink">{title}</p>}
        {children && <p className="t-body mt-0.5 text-ink-muted">{children}</p>}
      </div>
    </div>
  );
}
