import type { ReactNode } from 'react';

const stroke = '#496d5b';
const accent = '#b35f45';
const soft = '#8b5542';

const rasterShapes = [
  'acorn',
  'apple',
  'balloon',
  'bee',
  'berry',
  'bird',
  'boat',
  'butterfly',
  'candle',
  'carrot',
  'cat',
  'circle',
  'cloud',
  'egg',
  'fish',
  'flower',
  'hedgehog',
  'house',
  'lantern',
  'leaf',
  'moon',
  'mushroom',
  'nestegg',
  'pumpkin',
  'rainbow',
  'snail',
  'snowflake',
  'spiral',
  'star',
  'sun',
  'tree',
  'tulip',
  'wave',
  'wreath',
] as const;

const rasterSet = new Set<string>(rasterShapes);

function Frame({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 120 120" role="presentation" className="prompt-illustration" aria-hidden="true">
      {children}
    </svg>
  );
}

const svgFallbacks: Record<string, ReactNode> = {
  apple: (
    <Frame>
      <ellipse cx="60" cy="68" rx="28" ry="30" fill="none" stroke={accent} strokeWidth="3.5" />
      <path d="M60 42c0-10 6-18 14-22" fill="none" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
      <path d="M60 48c8-6 16-6 22-2" fill="none" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
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
  hills: (
    <Frame>
      <path d="M10 84c18-28 34-28 50 0" fill="none" stroke={stroke} strokeWidth="3.5" strokeLinecap="round" />
      <path d="M40 84c18-36 38-36 58 0" fill="none" stroke={soft} strokeWidth="3.5" strokeLinecap="round" />
      <path d="M70 84c14-22 28-22 42 0" fill="none" stroke={accent} strokeWidth="3.5" strokeLinecap="round" />
    </Frame>
  ),
  pinecone: (
    <Frame>
      <path d="M60 28c16 8 24 28 20 52-4 18-14 28-20 28s-16-10-20-28c-4-24 4-44 20-52z" fill="none" stroke={soft} strokeWidth="3.5" />
      <path d="M44 48c8 4 16 4 32 0M42 62c10 5 20 5 36 0M46 76c8 4 16 4 28 0" fill="none" stroke={accent} strokeWidth="3" strokeLinecap="round" />
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
  bird: (
    <Frame>
      <ellipse cx="52" cy="70" rx="26" ry="20" fill="none" stroke={stroke} strokeWidth="4" />
      <circle cx="78" cy="52" r="14" fill="none" stroke={stroke} strokeWidth="4" />
      <path d="M90 50l14 4-14 4z" fill="none" stroke={accent} strokeWidth="3.5" strokeLinejoin="round" />
      <path d="M40 62c-2-16 10-28 24-24" fill="none" stroke={soft} strokeWidth="4" strokeLinecap="round" />
      <circle cx="82" cy="50" r="2.5" fill={stroke} />
    </Frame>
  ),
  circle: (
    <Frame>
      <circle cx="60" cy="60" r="32" fill="none" stroke={stroke} strokeWidth="3.5" />
    </Frame>
  ),
};

export function PromptIllustration({ shape }: { shape: string }) {
  if (rasterSet.has(shape)) {
    return (
      <img
        className="prompt-illustration prompt-illustration--raster"
        src={`/illustrations/${shape}.png`}
        alt=""
        role="presentation"
        draggable={false}
      />
    );
  }

  return <>{svgFallbacks[shape] ?? svgFallbacks.circle}</>;
}
