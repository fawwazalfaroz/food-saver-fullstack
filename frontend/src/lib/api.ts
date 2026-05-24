// Helper function untuk memanggil API backend
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export async function fetchApi(endpoint: string, options: RequestInit = {}) {
  // Ambil token dari localStorage jika ada
  let token = '';
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('access_token') || '';
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  // Jika response tidak OK, lempar error dengan pesan dari backend jika ada
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || `API Error: ${response.status}`);
  }

  // Jika status 204 No Content, langsung return null
  if (response.status === 204) return null;

  // Cek apakah response body kosong sebelum memanggil .json()
  // Ini mencegah "Unexpected end of JSON input" crash
  const contentLength = response.headers.get('content-length');
  const contentType = response.headers.get('content-type') || '';

  if (contentLength === '0') return null;
  if (!contentType.includes('application/json')) return null;

  const text = await response.text();
  if (!text || text.trim() === '' || text.trim() === 'null') return null;

  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}
