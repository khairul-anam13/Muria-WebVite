import { useState } from 'react';
import { foto } from '@/data/foto';
import { layanan } from '@/data/site';
import { Angka } from './dasar';
import { Diagram } from './diagram';
import { Foto } from './foto';
import { Tabs } from './tabs';

export function LayananTabs() {
  const [aktif, setAktif] = useState<string>(layanan[0].id);
  return (
    <div>
      <Tabs idBase="layanan" label="Jenis layanan" items={layanan.map((l) => ({ value: l.id, label: l.tab }))} value={aktif} onChange={setAktif} />
      {/* semua panel dirender agar terbaca mesin pencari; yang tidak aktif disembunyikan */}
      {layanan.map((l) => {
        const f = foto.layanan[l.id];
        return (
          <div key={l.id} id={`layanan-panel-${l.id}`} role="tabpanel" aria-labelledby={`layanan-tab-${l.id}`} hidden={l.id !== aktif} tabIndex={0} className="pt-10">
            <h3 className="t-display-2">{l.nama}</h3>
            <p className="t-micro mt-1 text-ink-muted">{l.en}</p>

            {/* foto lapangan dan gambar teknik berdampingan, tinggi sama */}
            <div className="mt-8 grid gap-x-8 gap-y-6 md:grid-cols-2">
              <figure className="flex flex-col">
                <Foto f={f} isi className="flex-1" />
                <figcaption className="t-caption mt-3 text-ink-muted">{f.ket}</figcaption>
              </figure>
              <figure className="flex flex-col">
                <div className="flex-1 rounded-2 border border-line bg-surface p-4">
                  <Diagram nama={l.id} judul={l.gambar} />
                </div>
                <figcaption className="t-caption mt-3 text-ink-muted">{l.gambar}</figcaption>
              </figure>
            </div>

            <div className="mt-10 grid gap-x-12 gap-y-6 lg:grid-cols-12">
              <p className="max-w-[60ch] lg:col-span-7">
                <Angka>{l.isi}</Angka>
              </p>
              <dl className="grid grid-cols-[7rem_1fr] content-start gap-x-4 gap-y-3 border-t border-line pt-4 lg:col-span-5 lg:border-t-0 lg:pt-0">
                <dt className="t-label pt-0.5 text-ink-muted">Bahan</dt>
                <dd>{l.bahan}</dd>
                <dt className="t-label pt-0.5 text-ink-muted">Cocok untuk</dt>
                <dd>{l.untuk}</dd>
              </dl>
            </div>
          </div>
        );
      })}
    </div>
  );
}
