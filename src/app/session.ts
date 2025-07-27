'server-only'

import { cookies } from "next/headers"
import { SignJWT } from 'jose'

const encrypt =
  (payload: { userId: string, expiresAt: Date }) => new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' }).setIssuedAt().setExpirationTime('1d').sign(new TextEncoder().encode(process.env.SESSION_SECRET))
export const createSession = async (userId: string) => {
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000)
  const cookieStore = await cookies()

  cookieStore.set('session', await encrypt({ userId, expiresAt }), { httpOnly: true, secure: true, expires: expiresAt, sameSite: 'lax', path: '/' })
}