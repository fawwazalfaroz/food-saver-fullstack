import { NextRequest, NextResponse } from 'next/server';

// Routes that require authentication
const MERCHANT_ONLY = ['/dashboard'];
const CONSUMER_ONLY = ['/marketplace', '/product', '/checkout', '/orders'];
const AUTH_REQUIRED = ['/profile']; // Accessible by both roles, but requires login
const AUTH_PAGES = ['/login', '/register'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const role = request.cookies.get('user_role')?.value; // 'PENYEDIA' | 'PEMBELI' | undefined

  const isLoggedIn = !!role;
  const isMerchant = role === 'PENYEDIA';
  const isConsumer = role === 'PEMBELI';

  // ── 1. Redirect logged-in users away from auth pages ──
  if (isLoggedIn && AUTH_PAGES.some((p) => pathname.startsWith(p))) {
    const dest = isMerchant ? '/dashboard' : '/marketplace';
    return NextResponse.redirect(new URL(dest, request.url));
  }

  // ── 2. Routes that require login but are accessible by any role ──
  if (AUTH_REQUIRED.some((p) => pathname.startsWith(p))) {
    if (!isLoggedIn) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
    // Both roles can access — no role-based redirect
    return NextResponse.next();
  }

  // ── 3. Protect merchant-only routes ──
  if (MERCHANT_ONLY.some((p) => pathname.startsWith(p))) {
    if (!isLoggedIn) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
    if (isConsumer) {
      return NextResponse.redirect(new URL('/marketplace', request.url));
    }
  }

  // ── 4. Protect consumer-only routes ──
  if (CONSUMER_ONLY.some((p) => pathname.startsWith(p))) {
    if (!isLoggedIn) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
    if (isMerchant) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  // Run on all routes except static files, images, and Next.js internals
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
