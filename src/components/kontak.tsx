import { kontak, pesanInspeksi, tampil, wa } from '@/data/site';
import { Bagian } from './dasar';
import { FormInspeksi } from './form-inspeksi';
import { Panel } from './oxe';

const siapkan = [
  'Foto retak dari dekat, dengan penggaris atau koin di sampingnya sebagai pembanding.',
  'Foto dari jauh, supaya terlihat retak itu ada di kolom, balok, pelat, atau dinding.',
  'Fungsi ruang dan perkiraan umur bangunan.',
  'Apakah ada rembesan air, noda karat, atau bunyi kopong saat permukaan diketuk.',
];

const baris = 'grid gap-1 border-b border-line py-4 sm:grid-cols-[6rem_1fr] sm:items-baseline';

export function Kontak() {
  return (
    <Bagian id="kontak" judul="Foto retaknya. Kirim ke kami." lead="Kirim foto retak dan lokasinya lewat WhatsApp. Kami membalas dengan jadwal inspeksi, bukan brosur.">
      <div className="grid gap-x-16 gap-y-14 lg:grid-cols-12">
        <Panel eyebrow="Permintaan inspeksi" title="Ceritakan retaknya" className="p-6 md:p-8 lg:col-span-7">
          <FormInspeksi />
        </Panel>

        <div className="lg:col-span-5">
          <h3 className="t-label text-ink-muted">Hubungi langsung</h3>
          <dl className="mt-3 border-t border-line-strong">
            <div className={baris}>
              <dt className="t-label text-ink-muted">WhatsApp</dt>
              <dd className="t-value text-[15px]">
                <a href={wa(pesanInspeksi)} className="text-blue-ink underline underline-offset-4">
                  {tampil.whatsapp}
                </a>
              </dd>
            </div>
            <div className={baris}>
              <dt className="t-label text-ink-muted">Email</dt>
              <dd className="t-value text-[15px]">
                {kontak.email ? (
                  <a href={`mailto:${kontak.email}`} className="text-blue-ink underline underline-offset-4">
                    {tampil.email}
                  </a>
                ) : (
                  tampil.email
                )}
              </dd>
            </div>
            <div className={baris}>
              <dt className="t-label text-ink-muted">Kantor</dt>
              <dd>{tampil.alamat}</dd>
            </div>
          </dl>

          <h3 className="t-label mt-12 text-ink-muted">Yang perlu disiapkan</h3>
          <ul className="mt-3 max-w-[52ch] space-y-3 border-t border-line-strong pt-4">
            {siapkan.map((s) => (
              <li key={s} className="flex gap-3">
                <span aria-hidden="true" className="mt-2 size-1.5 flex-none rounded-round bg-blue" />
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Bagian>
  );
}
