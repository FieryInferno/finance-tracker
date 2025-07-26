'use server'

import Validator from '@/app/validator'

const validator = new Validator()
const LoginFormSchema = validator.object({ email: validator.string().email() })

export const login = async (state: void | { errors?: { email?: string[] } } | undefined, formData: FormData) => {
  const validatedFields = LoginFormSchema.safeParse({ email: formData.get('email') })

  if (!validatedFields.success) return { errors: validatedFields.error.fieldErrors }
}
