import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

// Load .env file
function loadEnv() {
  try {
    const envPath = join(ROOT, '.env');
    const content = readFileSync(envPath, 'utf8');
    for (const line of content.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eq = trimmed.indexOf('=');
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      const val = trimmed.slice(eq + 1).trim();
      if (!process.env[key]) process.env[key] = val;
    }
  } catch {}
}

loadEnv();

export const APP_KEY = process.env.PIXMIND_APP_KEY || 'app_7867c26ab713fb03aec0774ed28f5802';
export const API_KEY = process.env.PIXMIND_API_KEY;
export const API_BASE = (process.env.PIXMIND_API_BASE || 'http://127.0.0.1:8001').replace(/\/+$/, '');

export async function pixmindFetch(path, body = null) {
  if (!API_KEY) {
    console.error('Error: PIXMIND_API_KEY not set. Create .env file with PIXMIND_API_KEY=xxx');
    process.exit(1);
  }

  const url = `${API_BASE}${path}`;
  const headers = {
    'Content-Type': 'application/json',
    'X-App-Key': APP_KEY,
    'X-API-Key': API_KEY,
  };

  const opts = { method: body ? 'POST' : 'GET', headers };
  if (body) opts.body = JSON.stringify(body);

  const res = await fetch(url, opts);
  const data = await res.json();

  if (!res.ok) {
    console.error(`API Error ${res.status}:`, JSON.stringify(data, null, 2));
    process.exit(1);
  }

  return data;
}
