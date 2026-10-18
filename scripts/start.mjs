/**
 * Cross-platform production server runner (Windows / macOS / Linux).
 * Replaces: NODE_ENV=production bun .next/standalone/server.js 2>&1 | tee server.log
 * (`NODE_ENV=x cmd` prefix and `tee` do not work on Windows.)
 * Sets NODE_ENV via Node, spawns the standalone server, tees output into server.log.
 */
import { spawn } from 'node:child_process';
import { createWriteStream, existsSync } from 'node:fs';

if (!existsSync('.next/standalone/server.js')) {
  console.error('Standalone build not found. Run `npm run build` (or `bun run build`) first.');
  process.exit(1);
}

const logFile = createWriteStream('server.log', { flags: 'a' });

const child = spawn(process.execPath, ['.next/standalone/server.js'], {
  stdio: ['inherit', 'pipe', 'pipe'],
  env: { ...process.env, NODE_ENV: 'production' },
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
