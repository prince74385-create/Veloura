/**
 * Cross-platform dev server runner (Windows / macOS / Linux).
 * Replaces `next dev -p 3000 2>&1 | tee dev.log` (tee is not available on Windows).
 * Spawns Next.js dev server and tees all output into dev.log.
 */
import { spawn } from 'node:child_process';
import { createWriteStream } from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const nextBin = require.resolve('next/dist/bin/next');
const PORT = process.env.PORT || '3000';

const logFile = createWriteStream('dev.log', { flags: 'a' });

const child = spawn(process.execPath, [nextBin, 'dev', '-p', PORT], {
  stdio: ['inherit', 'pipe', 'pipe'],
  env: { ...process.env, FORCE_COLOR: '1' },
});

function tee(stream) {
  stream.on('data', (chunk) => {
    process.stdout.write(chunk);
    logFile.write(chunk);
  });
}
tee(child.stdout);
tee(child.stderr);

function shutdown() {
  logFile.end();
  if (!child.killed) child.kill();
}
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

child.on('exit', (code, signal) => {
  logFile.end(() => {
    if (signal === 'SIGINT' || signal === 'SIGTERM') process.exit(0);
    process.exit(code ?? 0);
  });
});
