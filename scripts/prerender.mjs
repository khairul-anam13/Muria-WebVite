// Prerender satu halaman: render <App /> ke HTML dan tanam di dist/index.html, supaya mesin pencari dan pratinjau
// tautan membaca isi sungguhan, bukan <div id="root"> kosong. Dipanggil oleh `npm run build` setelah build klien dan SSR.
import { readFileSync, rmSync, writeFileSync } from 'node:fs';

const { render } = await import(new URL('../dist-ssr/entry-server.js', import.meta.url).href);
const halaman = readFileSync('dist/index.html', 'utf8');
if (halaman.split('<!--app-->').length !== 2) throw new Error('dist/index.html harus memuat tepat satu penanda <!--app-->');
writeFileSync('dist/index.html', halaman.replace('<!--app-->', () => render()));
rmSync('dist-ssr', { recursive: true, force: true });
console.log('prerender selesai: dist/index.html berisi HTML halaman');
