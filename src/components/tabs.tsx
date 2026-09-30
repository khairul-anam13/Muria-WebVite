// oXe Tabs: garis-bawah, label mono kapital. Ditambah navigasi panah/Home/End dan pengait ARIA ke panelnya.
import { useRef, type KeyboardEvent } from 'react';
import { cx } from '@/lib/cx';

export function Tabs({
  items,
  value,
  onChange,
  label,
  idBase,
}: {
  items: Array<{ value: string; label: string }>;
  value: string;
  onChange: (v: string) => void;
  label: string;
  idBase: string;
}) {
  const tombol = useRef<Record<string, HTMLButtonElement | null>>({});
  function tekan(e: KeyboardEvent, i: number) {
    const geser = { ArrowRight: 1, ArrowLeft: -1, Home: -i, End: items.length - 1 - i }[e.key];
    if (!geser) return;
    e.preventDefault();
    const tujuan = items[(i + geser + items.length) % items.length];
    onChange(tujuan.value);
    tombol.current[tujuan.value]?.focus();
  }
  return (
    <div className="border-b border-line">
      <div role="tablist" aria-label={label} className="flex gap-6 overflow-x-auto [scrollbar-width:thin]">
        {items.map((it, i) => {
          const aktif = it.value === value;
          return (
            <button
              key={it.value}
              ref={(el) => {
                tombol.current[it.value] = el;
              }}
              id={`${idBase}-tab-${it.value}`}
              role="tab"
              type="button"
              aria-selected={aktif}
              aria-controls={`${idBase}-panel-${it.value}`}
              tabIndex={aktif ? 0 : -1}
              onClick={() => onChange(it.value)}
              onKeyDown={(e) => tekan(e, i)}
              className={cx(
                't-label relative flex-none cursor-pointer border-0 bg-transparent px-0.5 pt-3.5 pb-3 hover:text-ink after:absolute after:inset-x-0 after:bottom-0 after:h-0.5',
                aktif ? 'text-ink after:bg-blue' : 'text-ink-muted after:bg-transparent',
              )}
            >
              {it.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
