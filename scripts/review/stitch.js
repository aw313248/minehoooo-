/* Stitch section tiles into one long PNG. manifest.json lists tiles in order;
   cropPx > 0 means keep only the bottom cropPx CSS-pixels of that tile
   (a section's final tile overlaps its previous one). */
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const OUT = process.argv[2];
for (const mode of ['desktop', 'mobile']) {
  const dir = path.join(OUT, `_tiles_${mode}`);
  const { vh, tiles } = JSON.parse(fs.readFileSync(path.join(dir, 'manifest.json')));
  const probe = execFileSync('sips', ['-g', 'pixelHeight', path.join(dir, tiles[0].file)]).toString();
  const tilePx = Number(probe.match(/pixelHeight: (\d+)/)[1]);
  const dsf = tilePx / vh;

  const args = [];
  tiles.forEach(t => args.push('-i', path.join(dir, t.file)));
  let filter = '';
  const labels = tiles.map((t, i) => {
    if (t.cropPx > 0) {
      const keep = Math.round(t.cropPx * dsf);
      filter += `[${i}:v]crop=iw:${keep}:0:ih-${keep}[c${i}];`;
      return `[c${i}]`;
    }
    return `[${i}:v]`;
  });
  filter += `${labels.join('')}vstack=inputs=${tiles.length}`;
  args.push('-filter_complex', filter, '-frames:v', '1', '-update', '1', '-y', path.join(OUT, `${mode}-fullpage.png`));
  execFileSync('ffmpeg', args, { stdio: 'pipe' });
  fs.rmSync(dir, { recursive: true, force: true });
  console.log(`${mode} stitched: ${tiles.length} tiles, dsf=${dsf}`);
}
