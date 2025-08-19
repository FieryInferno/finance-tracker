'server-only'

import { cookies } from 'next/headers'
import { jwtVerify, SignJWT } from 'jose'

/**
 * The encoded secret key used for signing and verifying JWT tokens.
 * Loaded from the environment variable `SESSION_SECRET`.
 */
const encodedKey = new TextEncoder().encode(process.env.SESSION_SECRET)

/**
 * Encrypts the given payload into a signed JWT token.
 *
 * @param {{ userId: string, expiresAt: Date }} payload - The session payload to encrypt.
 * @returns {Promise<string>} A signed JWT string.
 */
const encrypt = (payload: { userId: string; expiresAt: Date }) =>
  new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1d')
    .sign(encodedKey)

/**
 * Verifies and decrypts a JWT session string.
 *
 * @param {string | undefined} session - The JWT token from the session cookie.
 * @returns {Promise<Record<string, any> | undefined>} The decoded payload if valid, otherwise undefined.
 */
export const decrypt = async (session: string | undefined = '') => {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256']
    })

    return payload
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    } else {
      console.error('Failed to verify session')
    }
  }
}

/**
 * Creates a secure session cookie for the given user ID.
 *
 * @param {string} userId - The user ID to include in the session.
 * @returns {Promise<void>} Sets a secure, HTTP-only cookie named `session`.
 */
export const createSession = async (userId: string) => {
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000)
  const cookieStore = await cookies()

  cookieStore.set('session', await encrypt({ userId, expiresAt }), {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/'
  })
}
