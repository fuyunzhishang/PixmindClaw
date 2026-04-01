export const API_KEY = process.env.PIXMIND_API_KEY;
export const API_BASE = 'https://aihub-admin.aimix.pro';

export async function pixmindFetch(path, body = null) {
  if (!API_KEY) {
    console.error('Error: PIXMIND_API_KEY not set. Get one at https://www.pixmind.io/api-keys');
    process.exit(1);
  }

  const url = `${API_BASE}${path}`;
  const headers = {
    'Content-Type': 'application/json',
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
