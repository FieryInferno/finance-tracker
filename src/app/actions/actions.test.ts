import AuthError from '../auth.error'
import { login } from './actions'

// Mock dependencies
jest.mock('@/app/validator', () => {
  return jest.fn().mockImplementation(() => ({
    object: jest.fn().mockReturnThis(),
    string: jest.fn().mockReturnThis(),
    email: jest.fn().mockReturnThis(),
    safeParse: jest.fn((data: any) => {
      if (data.email.includes('@')) return { success: true }

      return {
        success: false,
        error: { fieldErrors: { email: ['Invalid email'] } }
      }
    }),
  }))
})

jest.mock('@/app/login.service', () => ({
  login: jest.fn((email: string, password: string) => {
    if (email !== 'valid@example.com') throw new AuthError('User not found')
    if (email === 'valid@example.com' && password !== 'correctpassword') throw new AuthError('Password is incorrect')

    return Promise.resolve({})
  }),
}))

function createFormData(fields: Record<string, string>): FormData {
  const formData = new FormData()
  Object.entries(fields).forEach(([key, value]) => formData.append(key, value))
  return formData
}

describe('login', () => {
  it('returns errors for invalid email', async () => {
    const formData = createFormData({ email: 'invalid', password: 'any' })
    const result = await login(undefined, formData)
    expect(result.errors).toBeDefined()
    expect(result.errors?.email).toContain('Invalid email')
  })

  it('returns error message for incorrect password', async () => {
    const formData = createFormData({ email: 'valid@example.com', password: 'wrongpassword' })
    const result = await login(undefined, formData)
    expect(result.message).toBe('Login failed: Password is incorrect')
  })

  it('returns error message for user not found', async () => {
    const formData = createFormData({ email: 'unknown@example.com', password: 'any' })
    const result = await login(undefined, formData)

    expect(result.message).toBe('Login failed: User not found')
  })

  it('returns success message for valid credentials', async () => {
    const formData = createFormData({ email: 'valid@example.com', password: 'correctpassword' })
    const result = await login(undefined, formData)
    expect(result.message).toBe('Success')
  })
})