/**
 * Cross-platform build script (Windows / macOS / Linux).
 * Replaces: next build && cp -r .next/static ... && cp -r public ...
 * (`cp` is not available on Windows cmd/powershell.)
 * Runs `next build`, then copies static assets into the standalone output.
 */
import { spawn } from 'node:child_process';
import { cpSync, existsSync } from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const nextBin = require.resolve('next/dist/bin/next');

function run(cmd, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { stdio: 'inherit' });
    child.on('exit', (code) => (code === 0 ? resolve() : reject(new Error(`${cmd} exited with code ${code}`))));
    child.on('error', reject);
  });
}

async function main() {
  console.log('> next build');
  await run(process.execPath, [nextBin, 'build']);

  console.log('> Copying static assets into standalone output');
  cpSync('.next/static', '.next/standalone/.next/static', { recursive: true });
  if (existsSync('public')) {
    cpSync('public', '.next/standalone/public', { recursive: true });
  }
  console.log('> Build complete.');
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
