import { NextRequest, NextResponse } from "next/server"
import { decrypt } from '@/app/session'
import { cookies } from "next/headers"

/**
 * Middleware to handle user authentication based on session cookies.
 *
 * - Redirects unauthenticated users trying to access `/dashboard` to the `/login` page.
 * - Redirects authenticated users away from the `/login` page to `/dashboard`.
 *
 * @param {NextRequest} req - The incoming request object from Next.js.
 * @returns {Promise<NextResponse>} A redirect response or the next middleware/handler response.
 */
export default async (req: NextRequest): Promise<NextResponse> => {
  const cookie = (await cookies()).get('session')?.value
  const session = await decrypt(cookie)
  const { pathname } = req.nextUrl

  if (pathname === '/dashboard' && !session?.userId) return NextResponse.redirect(new URL('/login', req.nextUrl))
  if ((pathname === '/login' || pathname === '/') && session?.userId && !pathname.startsWith('/dashboard')) return NextResponse.redirect(new URL('/dashboard', req.nextUrl))

  return NextResponse.next()
}

/**
 * Middleware configuration to define which routes this middleware should run on.
 *
 * This middleware is excluded from running on:
 * - API routes: `/api/*`
 * - Next.js static files: `/_next/static/*`
 * - Image optimization routes: `/_next/image/*`
 * - Static image assets ending with `.png`
 */
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}