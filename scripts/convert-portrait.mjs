import sharp from 'sharp';
import { readdir, unlink } from 'fs/promises';
import path from 'path';

const dir = process.argv[2];
if (!dir) {
  console.error('Usage: node convert-portrait.mjs <folder>');
  process.exit(1);
}

const files = (await readdir(dir)).filter((f) => /\.(png|jpe?g)$/i.test(f)).sort();

let i = 1;
for (const file of files) {
  const input = path.join(dir, file);
  const output = path.join(dir, `${String(i).padStart(2, '0')}.webp`);
  await sharp(input)
    .resize(800, undefined, { withoutEnlargement: true })
    .webp({ quality: 85 })
    .toFile(output);
  await unlink(input);
  console.log(`${file} -> ${output}`);
  i++;
}
