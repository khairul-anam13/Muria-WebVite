import { menu, pesanInspeksi, wa } from '@/data/site';
import { Tanda } from './dasar';
import { MenuPonsel } from './menu-ponsel';
import { tombol } from './oxe';

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg">
      <div className="wadah flex h-14 items-center gap-6">
        <a href="#beranda" className="flex items-center gap-2.5" aria-label="CV Muria Struktura Teknik, ke awal halaman">
          <Tanda className="size-6" />
          <span className="text-[20px] leading-none font-bold tracking-[-0.2px]">Muria</span>
          <span className="t-label hidden text-ink-muted sm:inline">Struktura Teknik</span>
        </a>
        <nav aria-label="Utama" className="ml-auto hidden items-center gap-6 lg:flex">
          {menu.map((m) => (
            <a key={m.id} href={`#${m.id}`} className="text-[14px] font-medium text-ink-muted hover:text-ink">
              {m.label}
            </a>
          ))}
        </nav>
        <a href={wa(pesanInspeksi)} className={tombol('md', 'solid', 'ml-auto lg:ml-0')}>
          Minta inspeksi
        </a>
        <MenuPonsel />
      </div>
    </header>
  );
}
