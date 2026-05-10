// Helper function untuk memanggil API backend
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:30015';

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
  
  return response.json();
}
