import { useState } from 'react';
import { menu } from '@/data/site';
import { Button } from './oxe';

export function MenuPonsel() {
  const [buka, setBuka] = useState(false);
  return (
    <div className="lg:hidden">
      <Button aria-expanded={buka} aria-controls="menu-ponsel" onClick={() => setBuka(!buka)}>
        {buka ? 'Tutup' : 'Menu'}
      </Button>
      {buka && (
        <nav id="menu-ponsel" aria-label="Menu ponsel" className="absolute inset-x-0 top-full border-b border-line bg-bg">
          <ul className="wadah py-2">
            {menu.map((m) => (
              <li key={m.id}>
                <a href={`#${m.id}`} onClick={() => setBuka(false)} className="block border-b border-line py-3 text-[17px] font-semibold last:border-0">
                  {m.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
