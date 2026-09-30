import { Bagian } from './dasar';
import { PolaGambar } from './diagram';
import { LayananTabs } from './layanan-tabs';

export function Layanan() {
  return (
    <Bagian id="layanan" judul="Layanan" lead="Lima pekerjaan yang kami ambil. Semuanya berawal dari peta retak yang sama, apa pun metode akhirnya.">
      <PolaGambar />
      <LayananTabs />
    </Bagian>
  );
}
