import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const dist = join(root, 'dist');
const requiredFiles = ['index.html', 'src/main.js', 'src/styles.css'];

await rm(dist, { force: true, recursive: true });
await mkdir(join(dist, 'src'), { recursive: true });

for (const file of requiredFiles) {
  const contents = await readFile(join(root, file), 'utf8');
  if (!contents.trim()) {
    throw new Error(`${file} is empty`);
  }
  await writeFile(join(dist, file), contents);
}

const html = await readFile(join(root, 'index.html'), 'utf8');
const css = await readFile(join(root, 'src/styles.css'), 'utf8');
const js = await readFile(join(root, 'src/main.js'), 'utf8');

for (const token of ['Isola Vitale', 'Request Invitation', 'Design your stay']) {
  if (!html.includes(token)) {
    throw new Error(`Missing expected HTML token: ${token}`);
  }
}

for (const token of ['prefers-reduced-motion', 'background:', 'brand__seal']) {
  if (!css.includes(token)) {
    throw new Error(`Missing expected CSS token: ${token}`);
  }
}

for (const token of ['IntersectionObserver', 'aria-selected', 'journey__tab']) {
  if (!js.includes(token)) {
    throw new Error(`Missing expected JavaScript token: ${token}`);
  }
}

try {
  await cp(join(root, 'public'), join(dist, 'public'), { recursive: true });
} catch (error) {
  if (error.code !== 'ENOENT') {
    throw error;
  }
}

console.log('Built Isola Vitale static site to dist/.');
