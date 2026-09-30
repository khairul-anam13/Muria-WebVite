// oXe Toggle: sakelar persegi (bukan pil). Menyalakan tema gelap; pilihan disimpan di browser pengunjung.
import { useEffect, useState } from 'react';
import { cx } from '@/lib/cx';

export function TemaToggle() {
  const [gelap, setGelap] = useState(false);
  useEffect(() => setGelap(document.documentElement.dataset.tema === 'gelap'), []);

  function ubah() {
    const baru = !gelap;
    setGelap(baru);
    if (baru) document.documentElement.dataset.tema = 'gelap';
    else delete document.documentElement.dataset.tema;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', baru ? '#0e141f' : '#f4f7fc');
    try {
      localStorage.setItem('tema', baru ? 'gelap' : 'terang');
    } catch {
      /* mode privat: pilihan berlaku sampai halaman ditutup */
    }
  }

  return (
    <label className="inline-flex cursor-pointer items-center gap-3 text-[14px] font-medium text-ink-muted">
      <button
        type="button"
        role="switch"
        aria-checked={gelap}
        onClick={ubah}
        className={cx(
          'relative h-6 w-11 flex-none cursor-pointer rounded-2 border p-[3px] transition-colors duration-150 motion-reduce:transition-none',
          'after:absolute after:top-[3px] after:left-[3px] after:size-4 after:rounded-[1px] after:transition-transform after:duration-150 motion-reduce:after:transition-none',
          gelap ? 'border-blue bg-blue after:translate-x-[18px] after:bg-on-blue' : 'border-line-strong bg-surface after:bg-ink-faint',
        )}
      />
      Tampilan gelap
    </label>
  );
}
