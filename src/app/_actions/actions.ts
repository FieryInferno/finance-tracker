'use server'

import Validator from '@/app/validator'
import loginService from '@/app/login.service'
import AuthError from '../auth.error'
import { isDevelopment } from '../utils'
import { createSession } from '@/app/session'
import { redirect } from 'next/navigation'

/**
 * Handles user login by validating the email from form data,
 * attempting to authenticate via the login service, and managing session creation.
 *
 * @param state - Optional previous state that may contain validation errors.
 *                This is typically used in server actions to retain form state.
 * @param formData - The `FormData` object containing login fields, specifically `email` and `password`.
 *
 * @returns A promise that resolves to:
 * - An object containing `errors` if validation fails,
 * - An object containing a `message` if login or session creation fails,
 * - Or redirects the user to `/dashboard` on success.
 *
 * @throws Never throws directly — all errors are caught and returned as messages.
 *
 * @example
 * ```ts
 * const result = await login(undefined, formData)
 * if (result.errors) {
 *   // show form validation errors
 * } else if (result.message) {
 *   // show login failed message
 * } else {
 *   // user is redirected
 * }
 * ```
 */
export const login = async (
  state: void | { errors?: { email?: string[] } } | undefined,
  formData: FormData
): Promise<{ message?: string; errors?: { email?: string[] } }> => {
  const LoginFormSchema = new Validator().object({ email: new Validator().string().email() })
  const email = formData.get('email')
  const validatedFields = LoginFormSchema.safeParse({ email })

  if (!validatedFields.success) return { errors: validatedFields.error.fieldErrors }

  try {
    const data = await loginService.login(email as string, formData.get('password') as string)

    await createSession(data.email)
  } catch (error) {
    if (isDevelopment) console.error(error)

    return { message: error instanceof AuthError ? `Login failed: ${error.message}` : 'Login failed' }
  }

  redirect('/dashboard')
}
