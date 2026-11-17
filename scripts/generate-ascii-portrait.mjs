// Run from any directory: node scripts/generate-ascii-portrait.mjs
// Sharp is already installed with Next.js. No conversion runs in the browser.
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const source = fileURLToPath(new URL('../public/hugo-martins.jpg', import.meta.url));
const destination = new URL('../content/asciiPortrait.ts', import.meta.url);
// A tighter square crop gives the face priority over the shirt texture.
const crop = { left: 200, top: 0, width: 960, height: 960 };
const sourceSize = 1254;
// Normalized outline of the source photograph, excluding its background.
const outline = [
  [0.025, 0.51, 0.56], [0.04, 0.43, 0.68], [0.07, 0.38, 0.73],
  [0.12, 0.34, 0.76], [0.20, 0.305, 0.775], [0.30, 0.31, 0.775],
  [0.40, 0.325, 0.75], [0.50, 0.35, 0.725], [0.58, 0.37, 0.70],
  [0.63, 0.39, 0.705], [0.67, 0.36, 0.74], [0.70, 0.31, 0.80],
  [0.75, 0.20, 0.90], [0.80, 0.08, 1], [0.90, 0.025, 1], [1, 0.015, 1],
];
const ramp = ' .,:;=+*ox%#@';

function glyphFor(ink, edge) {
  const density = Math.min(1, Math.pow(ink, 1.05) * 0.9 + edge * 0.35);
  return ramp[Math.round(density * (ramp.length - 1))];
}

async function convert(columns, rows) {
  const { data } = await sharp(source)
    .extract(crop)
    .resize(columns, rows, { fit: 'fill' })
    .greyscale()
    .normalise({ lower: 1, upper: 99 })
    .raw()
    .toBuffer({ resolveWithObject: true });
  const darkLines = [];
  const lightLines = [];
  for (let y = 0; y < rows; y++) {
    const ny = (crop.top + ((y + 0.5) / rows) * crop.height) / sourceSize;
    const next = outline.findIndex(([height]) => height >= ny);
    let bounds = null;
    if (next > 0) {
      const a = outline[next - 1];
      const b = outline[next];
      const t = (ny - a[0]) / (b[0] - a[0]);
      bounds = [a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
    }
    let darkLine = '';
    let lightLine = '';
    for (let x = 0; x < columns; x++) {
      const nx = (crop.left + ((x + 0.5) / columns) * crop.width) / sourceSize;
      if (!bounds || nx < bounds[0] || nx > bounds[1]) {
        darkLine += ' ';
        lightLine += ' ';
        continue;
      }
      const value = data[y * columns + x] / 255;
      const left = data[y * columns + Math.max(0, x - 1)] / 255;
      const above = data[Math.max(0, y - 1) * columns + x] / 255;
      const edge = Math.abs(value - left) + Math.abs(value - above);
      darkLine += glyphFor(value, edge);
      lightLine += glyphFor(1 - value, edge);
    }
    darkLines.push(darkLine.trimEnd());
    lightLines.push(lightLine.trimEnd());
  }
  return { dark: darkLines.join('\n'), light: lightLines.join('\n'), columns, rows };
}

const asciiPortrait = {
  desktop: await convert(104, 65),
  mobile: await convert(64, 40),
};
await writeFile(destination,
  '// Generated from public/hugo-martins.jpg. Regenerate with node scripts/generate-ascii-portrait.mjs\n' +
  `export const asciiPortrait = ${JSON.stringify(asciiPortrait, null, 2)} as const;\n`,
);
console.log('Generated dark and light ASCII portraits for desktop (104x65) and mobile (64x40).');
