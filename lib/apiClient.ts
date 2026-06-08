import { normalizeResponse } from './backendApi';

/** Resolve API path — browser hits Render directly; dev uses Next.js /api proxy. */
export function getApiUrl(path: string): string {
  let apiPath = path.startsWith('/api/') ? path : `/api/${path}`;
  if (apiPath === '/api/auth/signup') apiPath = '/api/auth/register';

  const base = process.env.NEXT_PUBLIC_BACKEND_API_URL?.replace(/\/$/, '');
  if (base) return `${base}${apiPath}`;
  return apiPath;
}

export async function apiFetch(path: string, init?: RequestInit): Promise<Response> {
  return fetch(getApiUrl(path), init);
}

export async function apiJson<T = unknown>(
  path: string,
  init?: RequestInit
): Promise<{ ok: boolean; status: number; data: T }> {
  const res = await apiFetch(path, init);
  const raw = await res.json();
  return { ok: res.ok, status: res.status, data: normalizeResponse(raw) as T };
}
