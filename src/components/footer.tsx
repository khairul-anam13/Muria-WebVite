import { semuaFoto } from '@/data/foto';
import { menu, tampil, usaha } from '@/data/site';
import { Tanda } from './dasar';
import { TemaToggle } from './tema-toggle';

export function Footer() {
  const tahun = new Date().getFullYear();
  const berkredit = semuaFoto.filter((f) => f.contoh && f.kredit);
  return (
    <footer className="border-t border-line bg-surface py-12">
      <div className="wadah grid gap-x-12 gap-y-10 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <div className="flex items-center gap-2.5">
            <Tanda className="size-6" />
            <span className="text-[20px] leading-none font-bold tracking-[-0.2px]">Muria</span>
          </div>
          <p className="t-title mt-4">{usaha.nama}</p>
          <p className="mt-1 text-ink-muted">
            {usaha.bidang}. {tampil.alamat}.
          </p>
        </div>
        <nav aria-label="Ringkasan" className="lg:col-span-3">
          <ul className="grid grid-cols-2 gap-x-6 lg:grid-cols-1">
            {menu.map((m) => (
              <li key={m.id}>
                <a href={`#${m.id}`} className="inline-block py-1.5 text-[14px] font-medium text-ink-muted hover:text-ink">
                  {m.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex flex-col gap-6 lg:col-span-3">
          <TemaToggle />
          <p className="t-micro text-ink-muted">
            © {usaha.berdiri}
            {tahun > usaha.berdiri ? `–${tahun}` : ''} {usaha.nama}. Berdiri di {usaha.kota} pada {usaha.berdiri}.
          </p>
        </div>

        {/* baris terakhir, hanya selama masih ada foto contoh; hilang sendiri setelah semuanya diganti */}
        {berkredit.length > 0 && (
          <details className="border-t border-line pt-6 lg:col-span-12">
            <summary className="t-label cursor-pointer text-ink-muted hover:text-ink">Kredit foto contoh ({berkredit.length})</summary>
            <p className="t-caption mt-3 max-w-[70ch] text-ink-muted">
              Foto sementara dari Wikimedia Commons, dipangkas dan dikompres. Diganti dengan dokumentasi proyek Muria sebelum situs tayang.
            </p>
            <ul className="t-caption mt-4 grid gap-x-8 gap-y-2 text-ink-muted sm:grid-cols-2 lg:grid-cols-3">
              {berkredit.map(
                (f) =>
                  f.kredit && (
                    <li key={f.src}>
                      <a href={f.kredit.halaman} className="text-ink underline underline-offset-2" rel="noopener">
                        {f.kredit.judul}
                      </a>
                      , {f.kredit.oleh},{' '}
                      <a href={f.kredit.lisensiUrl} className="underline underline-offset-2" rel="noopener">
                        {f.kredit.lisensi}
                      </a>
                    </li>
                  ),
              )}
            </ul>
          </details>
        )}
      </div>
    </footer>
  );
}
