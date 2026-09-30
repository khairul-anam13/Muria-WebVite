// Formulir singkat yang menyusun pesan WhatsApp. Tidak ada server: data hanya ada di browser pengunjung.
import { useState, type ChangeEvent, type FormEvent } from 'react';
import { kontak, wa } from '@/data/site';
import { Banner, Button, Field } from './oxe';

const kosong = { nama: '', lokasi: '', lebar: '', catatan: '' };

export function FormInspeksi() {
  const [isi, setIsi] = useState(kosong);
  const [dicoba, setDicoba] = useState(false);
  const [hasil, setHasil] = useState<'belum' | 'terbuka' | 'tanpa-nomor'>('belum');
  const ubah = (k: keyof typeof kosong) => (e: ChangeEvent<HTMLInputElement>) => setIsi({ ...isi, [k]: e.target.value });
  const lokasiKosong = dicoba && !isi.lokasi.trim();

  function kirim(e: FormEvent) {
    e.preventDefault();
    setDicoba(true);
    if (!isi.lokasi.trim()) return document.getElementById('f-lokasi')?.focus();
    if (!kontak.whatsapp) {
      console.warn('[muria-vite] kontak.whatsapp kosong: isi di src/data/site.ts');
      return setHasil('tanpa-nomor');
    }
    const pesan = [
      `Halo Muria, saya ${isi.nama.trim() || 'ingin bertanya'} dan ingin minta inspeksi retak.`,
      `Lokasi: ${isi.lokasi.trim()}.`,
      isi.lebar.trim() && `Lebar retak sekitar ${isi.lebar.trim()} mm.`,
      isi.catatan.trim() && `Catatan: ${isi.catatan.trim()}.`,
      'Foto retak saya lampirkan.',
    ]
      .filter(Boolean)
      .join(' ');
    window.open(wa(pesan), '_blank', 'noopener');
    setHasil('terbuka');
  }

  return (
    <form onSubmit={kirim} noValidate className="mt-6 flex flex-col gap-5">
      <Field id="f-nama" label="Nama" placeholder="Nama Anda atau perusahaan" value={isi.nama} onChange={ubah('nama')} autoComplete="name" />
      <Field
        id="f-lokasi"
        label="Lokasi"
        placeholder="Mis. gudang di Kawasan Industri Gresik"
        value={isi.lokasi}
        onChange={ubah('lokasi')}
        invalid={lokasiKosong}
        help={lokasiKosong ? 'Isi lokasi supaya kami bisa menjadwalkan inspeksi.' : 'Kota atau kawasan, dan jenis bangunannya.'}
        required
      />
      <Field
        id="f-lebar"
        label="Perkiraan lebar retak"
        placeholder="0,3"
        suffix="mm"
        inputMode="decimal"
        value={isi.lebar}
        onChange={ubah('lebar')}
        help="Kosongkan bila belum tahu; foto dengan penggaris di sampingnya sudah cukup."
      />
      <Field id="f-catatan" label="Catatan" placeholder="Mis. retak di sambungan lantai, rembes saat hujan" value={isi.catatan} onChange={ubah('catatan')} />
      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" variant="solid" size="lg">
          Kirim lewat WhatsApp
        </Button>
        <span className="t-caption text-ink-muted">Pesan disusun otomatis; foto dilampirkan di WhatsApp.</span>
      </div>
      {hasil === 'terbuka' && (
        <Banner tone="success" title="WhatsApp dibuka di tab baru">
          Lampirkan foto retak pada pesan itu, lalu kirim.
        </Banner>
      )}
      {hasil === 'tanpa-nomor' && (
        <Banner tone="warning" title="Formulir belum aktif">
          Nomor WhatsApp kantor belum dicantumkan, jadi pesan ini belum bisa dikirim.
        </Banner>
      )}
    </form>
  );
}
