import { janji } from '@/data/site';
import { Angka, Bagian } from './dasar';

export function Keunggulan() {
  return (
    <Bagian
      id="keunggulan"
      judul="Janji yang bisa Anda periksa"
      lead="Lima keunggulan kami ditulis sebagai janji, lengkap dengan cara membuktikannya sebelum Anda membayar."
    >
      <div className="hidden grid-cols-12 gap-x-10 border-b border-line-strong pb-3 lg:grid">
        <p className="t-label col-span-3 text-ink-muted">Keunggulan</p>
        <p className="t-label col-span-5 text-ink-muted">Janji kami</p>
        <p className="t-label col-span-4 text-ink-muted">Cara Anda memeriksanya</p>
      </div>
      <ul className="border-t border-line-strong lg:border-0">
        {janji.map((j) => (
          <li key={j.judul} className="grid gap-x-10 gap-y-3 border-b border-line py-6 lg:grid-cols-12">
            <h3 className="t-title lg:col-span-3">{j.judul}</h3>
            <p className="lg:col-span-5">
              <Angka>{j.janji}</Angka>
            </p>
            <p className="flex gap-3 lg:col-span-4">
              <span aria-hidden="true" className="mt-2 size-1.5 flex-none rounded-round bg-blue" />
              <span>
                <span className="text-ink-muted lg:hidden">Cara memeriksa: </span>
                {j.periksa}
              </span>
            </p>
          </li>
        ))}
      </ul>
    </Bagian>
  );
}
