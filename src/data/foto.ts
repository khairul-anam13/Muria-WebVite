// Foto contoh (pengganti sementara) untuk situs profil. Sumber: Wikimedia Commons, semuanya berlisensi bebas untuk pemakaian
// komersial dengan kredit. Sudah dipangkas dan dikompres. Ganti dengan dokumentasi proyek asli, satu foto sekali jalan:
//   1. timpa berkas di public/foto dengan foto Anda (rasio dan ukuran anjuran ada di README),
//   2. ubah entrinya dari contoh(...) menjadi asli(berkas, lebar, tinggi, alt, keterangan).
// Penanda "Foto contoh" pada foto itu hilang; blok kredit di footer hilang sendiri setelah tak ada contoh(...) tersisa.

export interface Foto {
  src: string;
  w: number;
  h: number;
  alt: string;
  /** keterangan singkat di bawah foto */
  ket: string;
  contoh: boolean;
  kredit?: { judul: string; oleh: string; lisensi: string; lisensiUrl: string; halaman: string };
}

const LISENSI: Record<string, string> = {
  CC0: 'https://creativecommons.org/publicdomain/zero/1.0/',
  'CC BY 2.0': 'https://creativecommons.org/licenses/by/2.0/',
  'CC BY 3.0': 'https://creativecommons.org/licenses/by/3.0/',
  'CC BY-SA 4.0': 'https://creativecommons.org/licenses/by-sa/4.0/',
};
/** Foto milik Muria sendiri: tanpa penanda contoh dan tanpa kredit. */
export const asli = (berkas: string, w: number, h: number, alt: string, ket: string): Foto => ({
  src: `/foto/${berkas}.jpg`,
  w,
  h,
  alt,
  ket,
  contoh: false,
});
const contoh = (berkas: string, w: number, h: number, alt: string, ket: string, judul: string, oleh: string, lisensi: string, halaman: string): Foto => ({
  src: `/foto/${berkas}.jpg`,
  w,
  h,
  alt,
  ket,
  contoh: true,
  kredit: { judul, oleh, lisensi, lisensiUrl: LISENSI[lisensi], halaman },
});

export const foto = {
  hero: contoh('hero-retak-halus', 1000, 1250, "Kolom beton berwarna krem dengan retak halus dan noda lembap di permukaannya", "Retak halus pada kolom beton", "Qew bruecke nf beton kaputt 41 von 46", "Achim Hering", 'CC BY 3.0', "https://commons.wikimedia.org/wiki/File:Qew_bruecke_nf_beton_kaputt_41_von_46.jpg"),
  tim: contoh('tim-pelaksana', 960, 640, "Empat pekerja berhelm berjalan beriringan sambil membawa tas dan perkakas menuju lokasi kerja", "Tim pelaksana berangkat ke lokasi kerja", "Himeji Castle Construction Workers (4060073031)", "Kojach", 'CC BY 2.0', "https://commons.wikimedia.org/wiki/File:Himeji_Castle_Construction_Workers_(4060073031).jpg"),
  banner: contoh('banner-lantai-gudang', 1600, 686, "Lantai beton gudang dengan anyaman tulangan dan deretan kolom yang sedang disiapkan untuk pengecoran", "Lantai gudang dan deretan kolom beton, contoh struktur yang kami tangani", "Warehouse Concrete Floor preparation done by Platinum Construções", "Bernardobenzecry", 'CC BY-SA 4.0', "https://commons.wikimedia.org/wiki/File:Warehouse_Concrete_Floor_preparation_done_by_Platinum_Constru%C3%A7%C3%B5es.jpg"),
  /** urutan sama dengan tahap kerusakan di data/site.ts */
  tahap: [
    contoh('tahap-1-retak', 720, 540, "Kolom beton dengan retak vertikal pada permukaannya", "Retak pada kolom", "Qew bruecke nf beton kaputt 07 von 46", "Achim Hering", 'CC BY 3.0', "https://commons.wikimedia.org/wiki/File:Qew_bruecke_nf_beton_kaputt_07_von_46.jpg"),
    contoh('tahap-2-rembesan', 720, 540, "Kolom beton dengan noda lembap dan permukaan yang mulai retak halus", "Noda lembap pada kolom", "Qew bruecke nf beton kaputt 18 von 46", "Achim Hering", 'CC BY 3.0', "https://commons.wikimedia.org/wiki/File:Qew_bruecke_nf_beton_kaputt_18_von_46.jpg"),
    contoh('tahap-3-tulangan-berkarat', 720, 540, "Tepi kolom beton dengan tulangan baja berkarat yang terbuka", "Tulangan berkarat", "Qew bruecke nf beton kaputt 24 von 46", "Achim Hering", 'CC BY 3.0', "https://commons.wikimedia.org/wiki/File:Qew_bruecke_nf_beton_kaputt_24_von_46.jpg"),
    contoh('tahap-4-mengelupas', 720, 540, "Selimut beton yang mengelupas sehingga tulangan berkarat terlihat", "Beton mengelupas", "Qew bruecke nf beton kaputt 25 von 46", "Achim Hering", 'CC BY 3.0', "https://commons.wikimedia.org/wiki/File:Qew_bruecke_nf_beton_kaputt_25_von_46.jpg"),
    contoh('tahap-5-diperbaiki', 720, 540, "Sudut balok beton dengan bekas tambalan perbaikan di beberapa titik", "Bekas tambalan", "Qew bruecke nf beton kaputt 23 von 46", "Achim Hering", 'CC BY 3.0', "https://commons.wikimedia.org/wiki/File:Qew_bruecke_nf_beton_kaputt_23_von_46.jpg"),
  ],
  /** kunci sama dengan id layanan di data/site.ts */
  layanan: {
    perbaikan: contoh('layanan-perbaikan', 1040, 736, "Balok beton dengan retak dan tulangan berkarat yang sudah terbuka", "Retak dan tulangan berkarat pada balok", "Qew bruecke nf beton kaputt 34 von 46", "Achim Hering", 'CC BY 3.0', "https://commons.wikimedia.org/wiki/File:Qew_bruecke_nf_beton_kaputt_34_von_46.jpg"),
    perkuatan: contoh('layanan-perkuatan', 1040, 736, "Rangka tulangan dan selongsong kabel prategang balok beton di lokasi pengecoran", "Tulangan dan kabel prategang pada balok", "Post tensioned concrete beam for long span structure", "Mario Kleff", 'CC BY-SA 4.0', "https://commons.wikimedia.org/wiki/File:Post_tensioned_concrete_beam_for_long_span_structure.jpg"),
    injeksi: contoh('layanan-injeksi', 1040, 736, "Retak vertikal yang lebar pada dinding penahan beton", "Retak vertikal pada dinding penahan", "Detail of vertical crack in concrete retaining wall at Medway Park Sports Centre, Gillingham, Kent, England", "Sunolafjagtenben-hur", 'CC0', "https://commons.wikimedia.org/wiki/File:Detail_of_vertical_crack_in_concrete_retaining_wall_at_Medway_Park_Sports_Centre,_Gillingham,_Kent,_England.jpg"),
    waterproofing: contoh('layanan-waterproofing', 1040, 736, "Dak atap gedung berlapis vegetasi di atas sistem kedap air, dengan pipa dan unit mesin", "Dak atap gedung", "Green roof (48820773896)", "umbc sustainability", 'CC0', "https://commons.wikimedia.org/wiki/File:Green_roof_(48820773896).jpg"),
    inspeksi: contoh('layanan-inspeksi', 1040, 736, "Kepala tiang beton dengan retak dan noda karat, difoto dari bawah", "Retak dan noda karat pada kepala tiang", "Qew bruecke nf beton kaputt 33 von 46", "Achim Hering", 'CC BY 3.0', "https://commons.wikimedia.org/wiki/File:Qew_bruecke_nf_beton_kaputt_33_von_46.jpg"),
  },
} satisfies { hero: Foto; tim: Foto; banner: Foto; tahap: Foto[]; layanan: Record<string, Foto> };

export const semuaFoto: Foto[] = [foto.hero, foto.banner, ...foto.tahap, ...Object.values(foto.layanan), foto.tim];
