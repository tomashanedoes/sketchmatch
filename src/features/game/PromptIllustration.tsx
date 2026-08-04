import type { Audience } from '../../data/prompts/types';

const rasterShapes = [
  'acorn',
  'apple',
  'balloon',
  'bee',
  'berry',
  'bird',
  'boat',
  'bowl',
  'bridge',
  'butterfly',
  'candle',
  'carrot',
  'cat',
  'chair',
  'circle',
  'cloud',
  'cup',
  'egg',
  'feather',
  'fern',
  'field',
  'fish',
  'flower',
  'fruit',
  'hand',
  'harvest',
  'hedgehog',
  'hills',
  'horizon',
  'house',
  'lantern',
  'leaf',
  'lemniscate',
  'moon',
  'mountain',
  'mushroom',
  'nest',
  'nestegg',
  'path',
  'pinecone',
  'pumpkin',
  'rainbow',
  'ripple',
  'seedling',
  'shell',
  'snail',
  'snowflake',
  'spiral',
  'star',
  'stone',
  'sun',
  'tree',
  'tulip',
  'vase',
  'wave',
  'window',
  'wreath',
] as const;

/** Adult-only soft variants for shapes that would otherwise look too finished to copy. */
const adultAtmosphereShapes = new Set([
  'bowl',
  'candle',
  'egg',
  'lantern',
  'snowflake',
  'spiral',
  'tree',
  'wave',
  'wreath',
]);

const rasterSet = new Set<string>(rasterShapes);

function illustrationSrc(shape: string, audience?: Audience): string {
  if (audience === 'adults' && adultAtmosphereShapes.has(shape)) {
    return `/illustrations/${shape}-adult.png`;
  }
  if (rasterSet.has(shape)) {
    return `/illustrations/${shape}.png`;
  }
  return '/illustrations/circle.png';
}

export function PromptIllustration({
  shape,
  audience,
}: {
  shape: string;
  audience?: Audience;
}) {
  const src = illustrationSrc(shape, audience);

  return (
    <img
      className="prompt-illustration prompt-illustration--raster"
      src={src}
      alt=""
      role="presentation"
      draggable={false}
    />
  );
}
