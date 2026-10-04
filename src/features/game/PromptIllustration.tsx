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

const rasterSet = new Set<string>(rasterShapes);

export function PromptIllustration({ shape }: { shape: string }) {
  const file = rasterSet.has(shape) ? `${shape}.png` : 'circle.png';
  const src = `${import.meta.env.BASE_URL}illustrations/${file}`;

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
