// Lima gambar teknik (SVG buatan sendiri) untuk lima layanan. Skema, bukan skala.
import type { IdLayanan } from '@/data/site';

const teks = { font: '600 15px var(--font-sans)' } as const;
const teksMono = { font: '600 14px var(--font-mono)' } as const;

/** Pola arsir bersama; dirender sekali, dirujuk lewat url(#p-…) oleh semua gambar. */
export function PolaGambar() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
      <defs>
        <pattern id="p-beton" width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="4" r="1" style={{ fill: 'var(--color-ink-faint)' }} />
          <circle cx="11" cy="10" r="0.8" style={{ fill: 'var(--color-ink-faint)' }} />
          <circle cx="14" cy="3" r="0.6" style={{ fill: 'var(--color-ink-faint)' }} />
          <path d="M4.5 14l2.5-3.6L9.5 14z" fill="none" strokeWidth="0.7" style={{ stroke: 'var(--color-ink-faint)' }} />
        </pattern>
        <pattern id="p-resin" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <path d="M0 0V8" strokeWidth="3" style={{ stroke: 'var(--color-blue)' }} />
        </pattern>
      </defs>
    </svg>
  );
}

function Perbaikan() {
  const rongga = 'M70 70H250L262 100L248 132L215 158L160 168L110 150L78 118Z';
  return (
    <>
      <rect x="40" y="70" width="400" height="230" fill="url(#p-beton)" className="stroke-ink" strokeWidth="1.5" />
      <path d={rongga} className="fill-bg" />
      <path d={rongga} fill="url(#p-resin)" className="stroke-blue" strokeWidth="2.5" strokeLinejoin="round" />
      <circle cx="150" cy="112" r="20" className="fill-bg" />
      <circle cx="150" cy="112" r="16" fill="none" className="stroke-blue" strokeWidth="1.8" strokeDasharray="4 3" />
      <circle cx="150" cy="112" r="9" className="fill-ink" />
      <path d="M336 70H368L352 104Z" fill="url(#p-resin)" className="stroke-blue" strokeWidth="2" strokeLinejoin="round" />
      <path d="M352 104L347 140L355 182L349 232" fill="none" className="stroke-ink" strokeWidth="1.6" />
      <g fill="none" className="stroke-ink-muted" strokeWidth="1.2">
        <path d="M150 121H300M160 168H300" strokeDasharray="3 3" />
        <path d="M292 122V168" className="stroke-ink" strokeWidth="1.6" />
      </g>
      <path d="M292 122l-4 9h8zM292 168l-4-9h8z" className="fill-ink" />
      <rect x="300" y="134" width="84" height="24" className="fill-bg" />
      <g style={teks} className="fill-ink">
        <text x="306" y="151">± 20 mm</text>
        <text x="44" y="26">mortar perbaikan</text>
        <text x="170" y="54">tulangan + primer anti-karat</text>
        <text x="336" y="26">alur V + sealant</text>
        <text x="44" y="326">beton sehat</text>
      </g>
      <path d="M100 32L120 90M200 60L162 104M380 32L356 84M100 312L110 276" fill="none" className="stroke-ink-muted" strokeWidth="1.2" />
    </>
  );
}

function Perkuatan() {
  return (
    <>
      <rect x="140" y="55" width="200" height="200" rx="16" fill="none" className="stroke-blue" strokeWidth="8" />
      <rect x="152" y="67" width="176" height="176" rx="6" fill="url(#p-beton)" className="stroke-ink" strokeWidth="1.5" />
      <rect x="178" y="93" width="124" height="124" rx="5" fill="none" className="stroke-ink" strokeWidth="2.5" />
      <g className="fill-ink">
        <circle cx="188" cy="103" r="9" />
        <circle cx="292" cy="103" r="9" />
        <circle cx="188" cy="207" r="9" />
        <circle cx="292" cy="207" r="9" />
      </g>
      <g fill="none" className="stroke-blue" strokeWidth="2.4">
        <path d="M240 24V44M234 38l6 8 6-8" />
        <path d="M240 288V268M234 274l6-8 6 8" />
        <path d="M112 155H132M126 149l8 6-8 6" />
        <path d="M368 155H348M354 149l-8 6 8 6" />
      </g>
      <g style={teks} className="fill-ink">
        <text x="368" y="72">lembar CFRP</text>
        <text x="368" y="136">sengkang</text>
        <text x="368" y="240">tulangan utama</text>
        <text x="10" y="40">sudut dibulatkan</text>
        <text x="10" y="316">beton lama</text>
        <text x="10" y="158">tekanan</text>
        <text x="10" y="174">kekang</text>
      </g>
      <path d="M338 66L364 68M302 130L364 132M300 212L364 236M60 46L146 62M60 312L170 226" fill="none" className="stroke-ink-muted" strokeWidth="1.2" />
    </>
  );
}

function Injeksi() {
  const retak = 'M240 40L233 90L248 140L236 190L247 240L240 310';
  return (
    <>
      <g transform="translate(-24 0)">
        <rect x="110" y="40" width="260" height="270" fill="url(#p-beton)" className="stroke-ink" strokeWidth="1.5" />
        <path d={retak} fill="none" className="stroke-blue" strokeWidth="16" opacity="0.22" strokeLinejoin="round" />
        <path d={retak} fill="none" className="stroke-bg" strokeWidth="7" opacity="0.7" strokeLinejoin="round" />
        <path d={retak} fill="none" className="stroke-ink" strokeWidth="3.5" strokeLinejoin="round" />
        <path d="M240 310L247 240L236 190L242 165" fill="none" className="stroke-blue" strokeWidth="3.5" strokeLinejoin="round" />
        <g className="fill-bg stroke-ink" strokeWidth="2">
          {[[233, 90], [248, 140], [236, 190], [247, 240], [241, 290]].map(([x, y]) => (
            <circle key={y} cx={x} cy={y} r="10" />
          ))}
        </g>
        {[[233, 90, false], [248, 140, false], [236, 190, true], [247, 240, true], [241, 290, true]].map(([x, y, sampai]) => (
          <circle key={`d${y}`} cx={x as number} cy={y as number} r="3.5" className={sampai ? 'fill-blue' : 'fill-ink-muted'} />
        ))}
      </g>
      <path d="M227 290C270 290 300 306 350 306" fill="none" className="stroke-ink" strokeWidth="3" />
      <path d="M350 294h50l14 12-14 12h-50z" className="fill-blue" />
      <path d="M366 262V124" fill="none" className="stroke-blue" strokeWidth="2.6" strokeDasharray="7 5" />
      <path d="M366 112l-7 14h14z" className="fill-blue" />
      <g style={teks} className="fill-ink">
        <text x="10" y="94">packer</text>
        <text x="10" y="150">segel</text>
        <text x="10" y="166">permukaan</text>
        <text x="10" y="222">retak</text>
        <text x="378" y="172">injeksi dari</text>
        <text x="378" y="190">bawah ke atas</text>
        <text x="350" y="336">pompa injeksi</text>
      </g>
      <path d="M56 90H197M84 158L212 147M46 218L208 209" fill="none" className="stroke-ink-muted" strokeWidth="1.2" />
    </>
  );
}

function Waterproofing() {
  return (
    <>
      <rect x="40" y="210" width="290" height="100" fill="url(#p-beton)" className="stroke-ink" strokeWidth="1.5" />
      <path d="M230 210L224 245L234 275L228 310" fill="none" className="stroke-ink" strokeWidth="3.5" />
      <rect x="40" y="200" width="290" height="10" className="fill-ink-muted" />
      <rect x="40" y="176" width="290" height="24" className="fill-blue" />
      <path d="M40 188H330" fill="none" className="stroke-on-blue" strokeWidth="1.4" strokeDasharray="7 4" />
      <rect x="40" y="136" width="290" height="40" className="fill-ink stroke-ink" fillOpacity="0.06" strokeWidth="1.5" />
      <path
        className="fill-ink"
        d="M75 44c5 8 8 13 0 18-8-5-5-10 0-18zM135 74c5 8 8 13 0 18-8-5-5-10 0-18zM195 40c5 8 8 13 0 18-8-5-5-10 0-18zM265 70c5 8 8 13 0 18-8-5-5-10 0-18z"
      />
      <path d="M75 68V128M135 98V128M195 64V128M265 94V128" fill="none" className="stroke-ink" strokeWidth="1.6" strokeDasharray="4 5" />
      <path d="M230 142V170M218 174H242" fill="none" className="stroke-blue" strokeWidth="3" />
      <g style={teks} className="fill-ink">
        <text x="342" y="160">screed pelindung</text>
        <text x="342" y="186">membran cair</text>
        <text x="342" y="204">+ kain penguat</text>
        <text x="342" y="230">primer</text>
        <text x="342" y="268">beton dak</text>
        <text x="286" y="58">air hujan</text>
        <text x="244" y="162">tertahan</text>
      </g>
      <path d="M330 156H338M330 190H338M330 205L338 226M330 262H338" fill="none" className="stroke-ink-muted" strokeWidth="1.2" />
    </>
  );
}

function Inspeksi() {
  const retak = 'M40 60L120 96L160 132L250 152L300 190L440 206';
  return (
    <>
      <rect x="40" y="44" width="400" height="186" className="fill-ink stroke-ink" fillOpacity="0.04" strokeWidth="1.5" />
      <path d="M140 44V230M240 44V230M340 44V230M40 106H440M40 168H440" fill="none" className="stroke-ink-muted" strokeWidth="1" strokeDasharray="4 4" />
      <path d={retak} fill="none" className="stroke-bg" strokeWidth="8" strokeLinejoin="round" />
      <path d={retak} fill="none" className="stroke-ink" strokeWidth="2.6" strokeLinejoin="round" />
      {Array.from({ length: 12 }, (_, i) => {
        const x = 90 + (i % 4) * 100;
        const y = 75 + Math.floor(i / 4) * 62;
        return (
          <g key={i}>
            <circle cx={x} cy={y} r="11" className="fill-bg stroke-ink" strokeWidth="1.5" />
            <text x={x} y={y + 4} textAnchor="middle" style={{ font: '600 12px var(--font-mono)' }} className="fill-ink">
              {i + 1}
            </text>
          </g>
        );
      })}
      <g className="fill-ink">
        <path d="M100 100h52v22h-52z" />
        <path d="M300 172h52v22h-52z" />
      </g>
      <g style={teksMono} className="fill-bg">
        <text x="107" y="117">R-01</text>
        <text x="307" y="189">R-02</text>
      </g>
      <rect x="40" y="252" width="400" height="76" className="fill-surface stroke-ink" strokeWidth="1.2" />
      <g className="fill-ink">
        {[[72, 2], [138.5, 3], [204.8, 4.5], [269.7, 6.5], [335.5, 9], [401, 12]].map(([x, w]) => (
          <rect key={x} x={x} y="262" width={w} height="30" />
        ))}
      </g>
      <g style={{ font: '600 13px var(--font-mono)' }} className="fill-ink" textAnchor="middle">
        {[['0,1', 73], ['0,2', 140], ['0,3', 207], ['0,5', 273], ['0,8', 340], ['1,0', 407]].map(([t, x]) => (
          <text key={t} x={x} y="308">{t}</text>
        ))}
      </g>
      <g style={teks} className="fill-ink">
        <text x="40" y="30">titik uji rebound hammer</text>
        <text x="440" y="246" textAnchor="end">kartu retak, lebar dalam mm (skema)</text>
      </g>
    </>
  );
}

export function Diagram({ nama, judul }: { nama: IdLayanan; judul: string }) {
  const Isi = { perbaikan: Perbaikan, perkuatan: Perkuatan, injeksi: Injeksi, waterproofing: Waterproofing, inspeksi: Inspeksi }[nama];
  return (
    <svg viewBox="0 0 480 340" role="img" aria-label={judul} className="w-full">
      <Isi />
    </svg>
  );
}
