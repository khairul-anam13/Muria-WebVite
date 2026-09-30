import { angka, langkah, persen, ringkasBerita } from '@/data/site';
import { Angka, Bagian } from './dasar';
import { Panel, Tag } from './oxe';
import { PetaRetak } from './peta-retak';

const kepala = 't-label px-3 py-2 text-ink-muted';
const satuan = (s: string) => <span className="normal-case">{s}</span>;

export function CaraKerja() {
  const b = ringkasBerita();
  return (
    <Bagian
      id="cara-kerja"
      judul="Peta retak"
      lead="Cara kerja yang sama di setiap proyek, dari retak sehalus 0,05 mm sampai patahan selebar jari. Yang membedakan bukan alatnya, melainkan bahwa setiap langkah meninggalkan catatan."
    >
      <div className="grid grid-cols-1 gap-x-12 gap-y-14 xl:grid-cols-12">
        <ol className="xl:col-span-5">
          {langkah.map((l, i) => (
            <li key={l.judul} className="grid grid-cols-[28px_1fr] gap-x-4 border-t border-line py-6 first:border-line-strong">
              <span className="t-value grid size-7 place-items-center rounded-1 border border-line-strong">{i + 1}</span>
              <div>
                <h3 className="t-title">{l.judul}</h3>
                <p className="mt-1 max-w-[52ch] text-ink-muted">
                  <Angka>{l.isi}</Angka>
                </p>
              </div>
            </li>
          ))}
        </ol>

        {/* lengket di xl: denah tetap terlihat selama langkah-langkah di kirinya dibaca */}
        <div className="min-w-0 xl:sticky xl:top-24 xl:col-span-7 xl:self-start">
          <PetaRetak />
        </div>

        <div className="min-w-0 xl:col-span-12">
          <Panel eyebrow="Berita acara" title="Injeksi epoxy, lantai gudang" className="p-6 md:p-8">
            <Tag tone="blue" className="absolute top-4 right-4">
              Contoh
            </Tag>
            <p className="t-caption mt-1 max-w-[46ch] text-ink-muted">
              Satu paket pekerjaan. Angka di bawah hanya contoh format, bukan hasil proyek tertentu.
            </p>
            <div className="mt-6 overflow-x-auto" tabIndex={0} role="region" aria-label="Contoh tabel berita acara">
              <table className="t-value w-full md:min-w-[36rem]">
                <thead>
                  <tr className="border-b border-line-strong text-right align-bottom">
                    <th className="t-label py-2 pr-3 text-left text-ink-muted">Retak</th>
                    <th className={`${kepala} max-md:hidden`}>Panjang {satuan('(m)')}</th>
                    <th className={`${kepala} max-md:hidden`}>Lebar {satuan('(mm)')}</th>
                    <th className={`${kepala} max-md:hidden`}>Dalam {satuan('(mm)')}</th>
                    <th className={kepala}>Teoretis {satuan('(L)')}</th>
                    <th className={kepala}>Terpakai {satuan('(L)')}</th>
                    <th className="t-label py-2 pl-3 text-ink-muted">Selisih</th>
                  </tr>
                </thead>
                <tbody>
                  {b.baris.map((r) => (
                    <tr key={r.id} className="border-b border-line text-right">
                      <th scope="row" className="py-3 pr-3 text-left font-semibold">
                        {r.id}
                        <span className="mt-0.5 block font-sans text-[13px] leading-[18px] font-normal text-ink-muted md:hidden">
                          {angka(r.panjang)} m × {angka(r.lebar)} × {r.dalam} mm
                        </span>
                      </th>
                      <td className="px-3 py-3 max-md:hidden">{angka(r.panjang)}</td>
                      <td className="px-3 py-3 max-md:hidden">{angka(r.lebar)}</td>
                      <td className="px-3 py-3 max-md:hidden">{r.dalam}</td>
                      <td className="px-3 py-3">{angka(r.teori)}</td>
                      <td className="px-3 py-3">{angka(r.terpakai)}</td>
                      <td className="py-3 pl-3 font-semibold">{persen(r.selisih)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t border-line-strong text-right font-semibold">
                    <th scope="row" className="py-3 pr-3 text-left">
                      Jumlah
                    </th>
                    <td colSpan={3} className="max-md:hidden" />
                    <td className="px-3 py-3">{angka(b.teori)}</td>
                    <td className="px-3 py-3">{angka(b.terpakai)}</td>
                    <td className="py-3 pl-3">{persen(b.selisih)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <p className="t-caption mt-6 max-w-[62ch] text-ink-muted">
              Volume teoretis = panjang × lebar × dalam. Selisih di atas nol wajar: resin tersisa di packer dan selang, dan meresap ke pori
              beton. Selisih negatif berarti retak belum terisi penuh, dan itulah yang dicari berita acara ini.
            </p>
          </Panel>
        </div>
      </div>
    </Bagian>
  );
}
