import { build } from 'esbuild';
import fs from 'fs';
import path from 'path';

const isProduction = process.argv.includes('--production');

// Ensure dist directory exists
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist', { recursive: true });
}

// Copy HTML template
const htmlTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Offshore Bond Training Tool</title>
  <link href="./styles.css" rel="stylesheet">
</head>
<body>
  <div id="root"></div>
  <script type="module" src="./main.js"></script>
</body>
</html>`;

fs.writeFileSync('dist/index.html', htmlTemplate);

const buildOptions = {
  entryPoints: ['src/main.tsx'],
  bundle: true,
  outdir: 'dist',
  format: 'esm',
  target: 'es2020',
  jsx: 'automatic',
  jsxImportSource: 'react',
  loader: {
    '.png': 'file',
    '.jpg': 'file',
    '.jpeg': 'file',
    '.gif': 'file',
    '.svg': 'file',
    '.woff': 'file',
    '.woff2': 'file',
    '.ttf': 'file',
    '.eot': 'file'
  },
  define: {
    'process.env.NODE_ENV': isProduction ? '"production"' : '"development"'
  },
  minify: isProduction,
  sourcemap: !isProduction,
  external: []
};

// Add watch option only for development
if (!isProduction) {
  buildOptions.watch = true;
}

try {
  await build(buildOptions);
  console.log(isProduction ? 'Build completed successfully!' : 'Development server started!');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}
