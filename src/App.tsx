import { BadanUsaha } from '@/components/badan-usaha';
import { CaraKerja } from '@/components/cara-kerja';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Hero } from '@/components/hero';
import { Keunggulan } from '@/components/keunggulan';
import { Kontak } from '@/components/kontak';
import { Layanan } from '@/components/layanan';
import { Lokasi } from '@/components/lokasi';
import { Tentang } from '@/components/tentang';
import { Testimoni } from '@/components/testimoni';
import { kontak, usaha } from '@/data/site';

const ld = {
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
  name: usaha.nama,
  foundingDate: String(usaha.berdiri),
  address: { '@type': 'PostalAddress', addressLocality: usaha.kota, addressRegion: usaha.provinsi, addressCountry: 'ID' },
  areaServed: usaha.provinsi,
  ...(kontak.email && { email: kontak.email }),
  ...(kontak.whatsapp && { telephone: `+${kontak.whatsapp}` }),
};

export default function App() {
  return (
    <>
      <a
        href="#isi"
        className="absolute top-2 left-2 z-50 -translate-y-16 rounded-1 bg-blue px-4 py-2 font-semibold text-on-blue focus:translate-y-0"
      >
        Lewati ke konten
      </a>
      <Header />
      <main id="isi">
        <Hero />
        <Tentang />
        <Layanan />
        <CaraKerja />
        <Keunggulan />
        <Testimoni />
        <BadanUsaha />
        <Lokasi />
        <Kontak />
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </>
  );
}
