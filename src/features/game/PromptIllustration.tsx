import type { ReactNode } from 'react';

const stroke = '#496d5b';
const accent = '#b35f45';
const soft = '#8b5542';

function Frame({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 120 120" role="presentation" className="prompt-illustration" aria-hidden="true">
      {children}
    </svg>
  );
}

const illustrations: Record<string, ReactNode> = {
  apple: (
    <Frame>
      <ellipse cx="60" cy="68" rx="28" ry="30" fill="none" stroke={accent} strokeWidth="3.5" />
      <path d="M60 42c0-10 6-18 14-22" fill="none" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
      <path d="M60 48c8-6 16-6 22-2" fill="none" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
    </Frame>
  ),
  sun: (
    <Frame>
      <circle cx="60" cy="60" r="18" fill="none" stroke={accent} strokeWidth="3.5" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        return (
          <line
            key={deg}
            x1={60 + Math.cos(rad) * 26}
            y1={60 + Math.sin(rad) * 26}
            x2={60 + Math.cos(rad) * 38}
            y2={60 + Math.sin(rad) * 38}
            stroke={accent}
            strokeWidth="3"
            strokeLinecap="round"
          />
        );
      })}
    </Frame>
  ),
  moon: (
    <Frame>
      <path
        d="M72 28c-18 4-30 20-30 38s12 34 30 38c-22 2-42-14-42-38s20-40 42-38z"
        fill="none"
        stroke={soft}
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
    </Frame>
  ),
  snail: (
    <Frame>
      <path d="M34 82c8-2 18-2 28 4 8 4 18 4 26 0" fill="none" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
      <path d="M78 78c8-10 8-22 0-30s-22-8-30 0-8 22 0 30" fill="none" stroke={accent} strokeWidth="3.5" />
      <path d="M63 63c3-4 8-4 11 0" fill="none" stroke={accent} strokeWidth="2.5" />
      <path d="M42 78c-4-8-2-16 4-18" fill="none" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
    </Frame>
  ),
  leaf: (
    <Frame>
      <path d="M60 96c0-40 28-58 40-66-8 28-14 46-40 66z" fill="none" stroke={stroke} strokeWidth="3.5" strokeLinejoin="round" />
      <path d="M60 96c0-40-28-58-40-66 8 28 14 46 40 66z" fill="none" stroke={stroke} strokeWidth="3.5" strokeLinejoin="round" />
      <path d="M60 96V36" fill="none" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
    </Frame>
  ),
  flower: (
    <Frame>
      <circle cx="60" cy="58" r="10" fill="none" stroke={accent} strokeWidth="3" />
      {[0, 60, 120, 180, 240, 300].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        return (
          <ellipse
            key={deg}
            cx={60 + Math.cos(rad) * 22}
            cy={58 + Math.sin(rad) * 22}
            rx="10"
            ry="14"
            transform={`rotate(${deg} ${60 + Math.cos(rad) * 22} ${58 + Math.sin(rad) * 22})`}
            fill="none"
            stroke={soft}
            strokeWidth="3"
          />
        );
      })}
      <path d="M60 70v28" fill="none" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
    </Frame>
  ),
  mushroom: (
    <Frame>
      <path d="M28 62c4-24 24-36 32-36s28 12 32 36H28z" fill="none" stroke={accent} strokeWidth="3.5" strokeLinejoin="round" />
      <rect x="50" y="62" width="20" height="28" rx="6" fill="none" stroke={stroke} strokeWidth="3.5" />
      <circle cx="44" cy="48" r="3" fill={soft} />
      <circle cx="68" cy="44" r="2.5" fill={soft} />
    </Frame>
  ),
  acorn: (
    <Frame>
      <path d="M42 52h36c0 8-6 14-18 14s-18-6-18-14z" fill="none" stroke={soft} strokeWidth="3.5" />
      <path d="M46 64c2 22 8 30 14 30s12-8 14-30" fill="none" stroke={accent} strokeWidth="3.5" strokeLinejoin="round" />
      <path d="M60 40v12" fill="none" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
    </Frame>
  ),
  tree: (
    <Frame>
      <path d="M60 98V58" fill="none" stroke={soft} strokeWidth="4" strokeLinecap="round" />
      <path d="M60 70c-14-4-24-2-30 8M60 64c14-6 24-4 30 6M60 56c-10-12-8-24 0-32M60 56c10-12 8-24 0-32" fill="none" stroke={stroke} strokeWidth="3.5" strokeLinecap="round" />
    </Frame>
  ),
  carrot: (
    <Frame>
      <path d="M48 40c8 8 12 28 12 48 0-20 4-40 12-48" fill="none" stroke={accent} strokeWidth="3.5" strokeLinejoin="round" />
      <path d="M52 38c0-10-6-16-10-18M60 34c0-12 0-18 0-22M68 38c0-10 6-16 10-18" fill="none" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
    </Frame>
  ),
  berry: (
    <Frame>
      <circle cx="48" cy="58" r="12" fill="none" stroke={accent} strokeWidth="3.5" />
      <circle cx="70" cy="54" r="12" fill="none" stroke={accent} strokeWidth="3.5" />
      <circle cx="60" cy="74" r="12" fill="none" stroke={accent} strokeWidth="3.5" />
      <path d="M60 42c0-8 6-14 12-16" fill="none" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
    </Frame>
  ),
  cloud: (
    <Frame>
      <path d="M34 72c-8 0-14-6-14-14s6-14 14-14c2-10 12-16 22-14 4-8 14-12 22-8 10-2 20 6 20 16 8 0 14 6 14 14s-6 14-14 14H34z" fill="none" stroke={soft} strokeWidth="3.5" strokeLinejoin="round" />
    </Frame>
  ),
  star: (
    <Frame>
      <path d="M60 24l8 24h26l-20 16 8 26-22-16-22 16 8-26-20-16h26z" fill="none" stroke={accent} strokeWidth="3.5" strokeLinejoin="round" />
    </Frame>
  ),
  rainbow: (
    <Frame>
      <path d="M24 84a36 36 0 0 1 72 0" fill="none" stroke={accent} strokeWidth="3.5" strokeLinecap="round" />
      <path d="M34 84a26 26 0 0 1 52 0" fill="none" stroke={soft} strokeWidth="3.5" strokeLinecap="round" />
      <path d="M44 84a16 16 0 0 1 32 0" fill="none" stroke={stroke} strokeWidth="3.5" strokeLinecap="round" />
    </Frame>
  ),
  butterfly: (
    <Frame>
      <path d="M60 40v40" fill="none" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
      <path d="M60 55c-18-18-30-14-32-4s10 22 32 18" fill="none" stroke={accent} strokeWidth="3.5" strokeLinejoin="round" />
      <path d="M60 55c18-18 30-14 32-4s-10 22-32 18" fill="none" stroke={accent} strokeWidth="3.5" strokeLinejoin="round" />
      <path d="M60 68c-14-8-24-4-26 4s8 16 26 10" fill="none" stroke={soft} strokeWidth="3" />
      <path d="M60 68c14-8 24-4 26 4s-8 16-26 10" fill="none" stroke={soft} strokeWidth="3" />
    </Frame>
  ),
  bird: (
    <Frame>
      <ellipse cx="58" cy="64" rx="24" ry="16" fill="none" stroke={stroke} strokeWidth="3.5" />
      <circle cx="78" cy="54" r="10" fill="none" stroke={stroke} strokeWidth="3.5" />
      <path d="M86 54l12 2" fill="none" stroke={accent} strokeWidth="3" strokeLinecap="round" />
      <path d="M50 58c-4-12 2-22 12-24" fill="none" stroke={soft} strokeWidth="3" strokeLinecap="round" />
      <circle cx="80" cy="52" r="2" fill={stroke} />
    </Frame>
  ),
  fish: (
    <Frame>
      <ellipse cx="58" cy="60" rx="28" ry="16" fill="none" stroke={stroke} strokeWidth="3.5" />
      <path d="M86 60l18-12v24z" fill="none" stroke={accent} strokeWidth="3.5" strokeLinejoin="round" />
      <circle cx="42" cy="56" r="2.5" fill={stroke} />
      <path d="M58 52c4 4 4 12 0 16" fill="none" stroke={soft} strokeWidth="2.5" />
    </Frame>
  ),
  cat: (
    <Frame>
      <circle cx="60" cy="64" r="24" fill="none" stroke={stroke} strokeWidth="3.5" />
      <path d="M40 50l8-18 10 14M72 46l10-14 8 18" fill="none" stroke={soft} strokeWidth="3.5" strokeLinejoin="round" />
      <circle cx="50" cy="62" r="2.5" fill={stroke} />
      <circle cx="70" cy="62" r="2.5" fill={stroke} />
      <path d="M56 72h8" fill="none" stroke={accent} strokeWidth="3" strokeLinecap="round" />
    </Frame>
  ),
  bee: (
    <Frame>
      <ellipse cx="60" cy="64" rx="22" ry="14" fill="none" stroke={accent} strokeWidth="3.5" />
      <path d="M48 54v20M60 50v28M72 54v20" fill="none" stroke={soft} strokeWidth="3" />
      <path d="M48 48c-2-14 8-20 16-12M72 48c2-14-8-20-16-12" fill="none" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
    </Frame>
  ),
  hedgehog: (
    <Frame>
      <ellipse cx="58" cy="72" rx="30" ry="18" fill="none" stroke={stroke} strokeWidth="3.5" />
      <path d="M36 62l-8-16M48 54l-2-18M60 50v-18M72 54l4-16M84 62l10-14" fill="none" stroke={soft} strokeWidth="3" strokeLinecap="round" />
      <circle cx="78" cy="74" r="2.5" fill={accent} />
    </Frame>
  ),
  house: (
    <Frame>
      <path d="M28 64l32-28 32 28" fill="none" stroke={accent} strokeWidth="3.5" strokeLinejoin="round" />
      <rect x="36" y="64" width="48" height="30" fill="none" stroke={stroke} strokeWidth="3.5" />
      <rect x="52" y="74" width="16" height="20" fill="none" stroke={soft} strokeWidth="3" />
    </Frame>
  ),
  balloon: (
    <Frame>
      <ellipse cx="60" cy="48" rx="22" ry="28" fill="none" stroke={accent} strokeWidth="3.5" />
      <path d="M60 76c0 8-4 14-4 22" fill="none" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
      <path d="M52 74h16l-8 8z" fill="none" stroke={soft} strokeWidth="3" strokeLinejoin="round" />
    </Frame>
  ),
  boat: (
    <Frame>
      <path d="M28 78h64l-10 14H38z" fill="none" stroke={stroke} strokeWidth="3.5" strokeLinejoin="round" />
      <path d="M60 78V36" fill="none" stroke={soft} strokeWidth="3" strokeLinecap="round" />
      <path d="M60 38l28 28H60z" fill="none" stroke={accent} strokeWidth="3.5" strokeLinejoin="round" />
    </Frame>
  ),
  circle: (
    <Frame>
      <circle cx="60" cy="60" r="32" fill="none" stroke={stroke} strokeWidth="3.5" />
    </Frame>
  ),
  spiral: (
    <Frame>
      <path d="M60 60c8 0 14 6 14 14s-10 18-22 18-26-12-26-28 16-36 36-36 40 18 40 42" fill="none" stroke={accent} strokeWidth="3.5" strokeLinecap="round" />
    </Frame>
  ),
  wave: (
    <Frame>
      <path d="M20 60c12-18 24-18 36 0s24 18 36 0 24-18 36 0" fill="none" stroke={stroke} strokeWidth="3.5" strokeLinecap="round" />
      <path d="M20 78c12-14 24-14 36 0s24 14 36 0" fill="none" stroke={soft} strokeWidth="3" strokeLinecap="round" />
    </Frame>
  ),
  shell: (
    <Frame>
      <path d="M60 84c-20 0-34-16-34-34 0-8 20-28 34-40 14 12 34 32 34 40 0 18-14 34-34 34z" fill="none" stroke={soft} strokeWidth="3.5" strokeLinejoin="round" />
      <path d="M60 84V30M46 78c4-14 8-28 14-42M74 78c-4-14-8-28-14-42" fill="none" stroke={accent} strokeWidth="2.5" strokeLinecap="round" />
    </Frame>
  ),
  vase: (
    <Frame>
      <path d="M44 36h32l-4 12c8 8 10 20 8 36-2 12-10 20-20 20s-18-8-20-20c-2-16 0-28 8-36z" fill="none" stroke={stroke} strokeWidth="3.5" strokeLinejoin="round" />
      <path d="M60 36c4-14 12-22 22-26" fill="none" stroke={soft} strokeWidth="3" strokeLinecap="round" />
    </Frame>
  ),
  hills: (
    <Frame>
      <path d="M10 84c18-28 34-28 50 0" fill="none" stroke={stroke} strokeWidth="3.5" strokeLinecap="round" />
      <path d="M40 84c18-36 38-36 58 0" fill="none" stroke={soft} strokeWidth="3.5" strokeLinecap="round" />
      <path d="M70 84c14-22 28-22 42 0" fill="none" stroke={accent} strokeWidth="3.5" strokeLinecap="round" />
    </Frame>
  ),
  fern: (
    <Frame>
      <path d="M60 96V28" fill="none" stroke={stroke} strokeWidth="3.5" strokeLinecap="round" />
      {[38, 50, 62, 74].map((y, i) => (
        <g key={y}>
          <path d={`M60 ${y}c-${10 + i * 2}-${6 + i} -${18 + i * 2}-${4 + i} -${22 + i * 2} 2`} fill="none" stroke={soft} strokeWidth="3" strokeLinecap="round" />
          <path d={`M60 ${y}c${10 + i * 2}-${6 + i} ${18 + i * 2}-${4 + i} ${22 + i * 2} 2`} fill="none" stroke={soft} strokeWidth="3" strokeLinecap="round" />
        </g>
      ))}
    </Frame>
  ),
  pinecone: (
    <Frame>
      <path d="M60 28c16 8 24 28 20 52-4 18-14 28-20 28s-16-10-20-28c-4-24 4-44 20-52z" fill="none" stroke={soft} strokeWidth="3.5" />
      <path d="M44 48c8 4 16 4 32 0M42 62c10 5 20 5 36 0M46 76c8 4 16 4 28 0" fill="none" stroke={accent} strokeWidth="3" strokeLinecap="round" />
    </Frame>
  ),
  seedling: (
    <Frame>
      <path d="M60 96V58" fill="none" stroke={stroke} strokeWidth="3.5" strokeLinecap="round" />
      <path d="M60 60c-14-4-24-16-22-28 14 2 22 12 22 28z" fill="none" stroke={soft} strokeWidth="3.5" strokeLinejoin="round" />
      <path d="M60 60c14-4 24-16 22-28-14 2-22 12-22 28z" fill="none" stroke={soft} strokeWidth="3.5" strokeLinejoin="round" />
    </Frame>
  ),
  stone: (
    <Frame>
      <path d="M28 72c4-20 18-32 36-32s28 14 32 28c2 12-8 22-24 24H48c-14 0-22-8-20-20z" fill="none" stroke={stroke} strokeWidth="3.5" strokeLinejoin="round" />
    </Frame>
  ),
  feather: (
    <Frame>
      <path d="M36 88c20-20 36-44 44-68" fill="none" stroke={stroke} strokeWidth="3.5" strokeLinecap="round" />
      <path d="M48 72c8-4 16-14 20-22M56 60c8-4 14-12 18-18M64 48c6-2 10-8 14-12" fill="none" stroke={soft} strokeWidth="2.5" strokeLinecap="round" />
    </Frame>
  ),
  nest: (
    <Frame>
      <ellipse cx="60" cy="70" rx="34" ry="18" fill="none" stroke={soft} strokeWidth="3.5" />
      <path d="M30 66c10 8 20 12 30 12s20-4 30-12" fill="none" stroke={accent} strokeWidth="3" />
      <path d="M36 58c8-10 16-14 24-14s16 4 24 14" fill="none" stroke={stroke} strokeWidth="3" />
    </Frame>
  ),
  path: (
    <Frame>
      <path d="M40 96c4-20 8-36 4-52s-2-28 16-36" fill="none" stroke={stroke} strokeWidth="3.5" strokeLinecap="round" />
      <path d="M58 96c8-22 14-38 12-54s2-26 18-34" fill="none" stroke={stroke} strokeWidth="3.5" strokeLinecap="round" />
    </Frame>
  ),
  horizon: (
    <Frame>
      <path d="M16 64h88" fill="none" stroke={stroke} strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="84" cy="40" r="10" fill="none" stroke={accent} strokeWidth="3" />
    </Frame>
  ),
  mountain: (
    <Frame>
      <path d="M16 88l28-52 16 28 16-36 28 60H16z" fill="none" stroke={stroke} strokeWidth="3.5" strokeLinejoin="round" />
      <path d="M54 52l6-8 8 10" fill="none" stroke={soft} strokeWidth="3" strokeLinecap="round" />
    </Frame>
  ),
  field: (
    <Frame>
      <path d="M14 48c20-8 40-8 60 0s30 8 40 2" fill="none" stroke={soft} strokeWidth="3" strokeLinecap="round" />
      {[28, 40, 52, 64, 76, 88].map((x) => (
        <path key={x} d={`M${x} 88c0-18 2-34 0-48`} fill="none" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
      ))}
    </Frame>
  ),
  bridge: (
    <Frame>
      <path d="M18 78h84" fill="none" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
      <path d="M28 78c8-28 24-40 32-40s24 12 32 40" fill="none" stroke={accent} strokeWidth="3.5" />
      <path d="M20 88c12-8 28-8 40 0s28 8 40 0" fill="none" stroke={soft} strokeWidth="3" />
    </Frame>
  ),
  cup: (
    <Frame>
      <path d="M36 40h40l-4 44c0 10-8 16-16 16s-16-6-16-16z" fill="none" stroke={stroke} strokeWidth="3.5" strokeLinejoin="round" />
      <path d="M76 48c12 2 16 12 10 22s-16 10-20 6" fill="none" stroke={soft} strokeWidth="3.5" strokeLinecap="round" />
    </Frame>
  ),
  candle: (
    <Frame>
      <rect x="50" y="48" width="20" height="46" rx="4" fill="none" stroke={stroke} strokeWidth="3.5" />
      <path d="M60 48c0-8 6-14 0-22-6 8 0 14 0 22z" fill="none" stroke={accent} strokeWidth="3.5" strokeLinejoin="round" />
    </Frame>
  ),
  window: (
    <Frame>
      <rect x="28" y="28" width="64" height="64" rx="4" fill="none" stroke={stroke} strokeWidth="3.5" />
      <path d="M60 28v64M28 60h64" fill="none" stroke={soft} strokeWidth="3" />
      <path d="M36 78c8-10 16-10 24 0s16 10 24 0" fill="none" stroke={accent} strokeWidth="2.5" />
    </Frame>
  ),
  chair: (
    <Frame>
      <path d="M40 40h40v24H40z" fill="none" stroke={stroke} strokeWidth="3.5" />
      <path d="M36 64h48" fill="none" stroke={soft} strokeWidth="3.5" strokeLinecap="round" />
      <path d="M42 64v28M78 64v28M42 40v-12h36" fill="none" stroke={stroke} strokeWidth="3.5" strokeLinecap="round" />
    </Frame>
  ),
  bowl: (
    <Frame>
      <path d="M28 48h64c-2 28-14 40-32 40s-30-12-32-40z" fill="none" stroke={stroke} strokeWidth="3.5" strokeLinejoin="round" />
      <path d="M28 48h64" fill="none" stroke={soft} strokeWidth="3" strokeLinecap="round" />
    </Frame>
  ),
  ripple: (
    <Frame>
      <circle cx="60" cy="60" r="8" fill="none" stroke={accent} strokeWidth="3" />
      <circle cx="60" cy="60" r="20" fill="none" stroke={soft} strokeWidth="3" />
      <circle cx="60" cy="60" r="34" fill="none" stroke={stroke} strokeWidth="3" />
    </Frame>
  ),
  lemniscate: (
    <Frame>
      <path d="M28 60c0-16 12-28 28-28 10 0 18 6 24 14 6-8 14-14 24-14 16 0 28 12 28 28s-12 28-28 28c-10 0-18-6-24-14-6 8-14 14-24 14-16 0-28-12-28-28z" fill="none" stroke={accent} strokeWidth="3.5" />
    </Frame>
  ),
  hand: (
    <Frame>
      <path d="M44 96v-40c0-6 4-10 8-10s8 4 8 10v-20c0-6 4-10 8-10s8 4 8 10v16c0-6 4-10 8-10s8 4 8 10v12c0-6 4-10 8-10s8 4 8 10v38c0 14-10 22-24 22H64c-12 0-20-8-20-22z" fill="none" stroke={stroke} strokeWidth="3.5" strokeLinejoin="round" />
    </Frame>
  ),
  fruit: (
    <Frame>
      <ellipse cx="44" cy="66" rx="18" ry="22" fill="none" stroke={accent} strokeWidth="3.5" />
      <ellipse cx="74" cy="62" rx="16" ry="20" fill="none" stroke={soft} strokeWidth="3.5" />
      <path d="M44 46c0-8 4-14 10-16M74 44c2-8 8-12 14-12" fill="none" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
    </Frame>
  ),
  lantern: (
    <Frame>
      <rect x="40" y="40" width="40" height="44" rx="8" fill="none" stroke={accent} strokeWidth="3.5" />
      <path d="M50 40V30h20v10M60 84v12" fill="none" stroke={stroke} strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="60" cy="60" r="8" fill="none" stroke={soft} strokeWidth="3" />
    </Frame>
  ),
  wreath: (
    <Frame>
      <circle cx="60" cy="60" r="30" fill="none" stroke={stroke} strokeWidth="3.5" />
      <path d="M40 44c6-4 10-2 12 2M70 40c6 0 10 4 10 8M84 62c2 6-2 10-6 10M66 84c-6 4-12 2-14-2M40 74c-4-4-2-10 2-12" fill="none" stroke={soft} strokeWidth="3" strokeLinecap="round" />
    </Frame>
  ),
  egg: (
    <Frame>
      <path d="M60 24c18 8 28 28 28 46s-12 30-28 30-28-12-28-30 10-38 28-46z" fill="none" stroke={soft} strokeWidth="3.5" />
      <path d="M44 58c8-4 16-4 32 0" fill="none" stroke={accent} strokeWidth="2.5" strokeLinecap="round" />
    </Frame>
  ),
  snowflake: (
    <Frame>
      <path d="M60 26v68M30 44l60 32M30 76l60-32" fill="none" stroke={stroke} strokeWidth="3.5" strokeLinecap="round" />
      <path d="M60 40l-6-8M60 40l6-8M60 80l-6 8M60 80l6 8M40 50l-10 0M40 50l-4 8M80 70l10 0M80 70l4 8" fill="none" stroke={soft} strokeWidth="2.5" strokeLinecap="round" />
    </Frame>
  ),
  tulip: (
    <Frame>
      <path d="M60 96V58" fill="none" stroke={stroke} strokeWidth="3.5" strokeLinecap="round" />
      <path d="M60 58c-12-2-20-14-16-28 8 4 14 12 16 28z" fill="none" stroke={accent} strokeWidth="3.5" />
      <path d="M60 58c12-2 20-14 16-28-8 4-14 12-16 28z" fill="none" stroke={accent} strokeWidth="3.5" />
      <path d="M60 58c0-16 0-28 0-34" fill="none" stroke={soft} strokeWidth="3" strokeLinecap="round" />
    </Frame>
  ),
  pumpkin: (
    <Frame>
      <path d="M30 68c0-20 12-32 30-32s30 12 30 32-12 28-30 28-30-8-30-28z" fill="none" stroke={accent} strokeWidth="3.5" />
      <path d="M48 40c0-20 8-8 12 0M60 38c4-12 10-8 12 4" fill="none" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
      <path d="M45 52v36M60 44v44M75 52v36" fill="none" stroke={soft} strokeWidth="2.5" />
    </Frame>
  ),
  nestegg: (
    <Frame>
      <ellipse cx="60" cy="78" rx="32" ry="14" fill="none" stroke={soft} strokeWidth="3.5" />
      <path d="M60 42c12 6 18 18 18 30s-8 20-18 20-18-8-18-20 6-24 18-30z" fill="none" stroke={accent} strokeWidth="3.5" />
    </Frame>
  ),
  harvest: (
    <Frame>
      <path d="M36 88c0-28 4-48 8-60M52 88c0-32 2-52 4-64M68 88c0-32-2-52-4-64M84 88c0-28-4-48-8-60" fill="none" stroke={stroke} strokeWidth="3.5" strokeLinecap="round" />
      <path d="M34 40c10-8 20-8 30 0s20 8 30 0" fill="none" stroke={accent} strokeWidth="3" strokeLinecap="round" />
    </Frame>
  ),
};

export function PromptIllustration({ shape }: { shape: string }) {
  return illustrations[shape] ?? illustrations.circle;
}
