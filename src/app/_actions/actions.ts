'use server'

import Validator from '@/app/validator'
import loginService from '@/app/login.service'
import AuthError from '../auth.error'
import { isDevelopment } from '../utils'
import { createSession } from '@/app/session'
import { redirect } from 'next/navigation'

/**
 * Handles user login by validating the provided form data and invoking the login service.
 *
 * @param state - The current state object containing optional message and errors.
 * @param formData - The form data containing user credentials (email and password).
 * @returns A promise that resolves to an object containing either a success message,
 *          or error messages if validation or authentication fails.
 */
const LoginFormSchema = new Validator().object({ email: new Validator().string().email() })
export const login = async (
  state: void | { errors?: { email?: string[] } } | undefined,
  formData: FormData
): Promise<{ message?: string; errors?: { email?: string[] } }> => {
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
