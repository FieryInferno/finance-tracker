import { login } from './actions'
import AuthError from '../auth.error'

jest.mock('@/app/validator')
jest.mock('@/app/login.service')
jest.mock('@/app/session', () => ({
  createSession: jest.fn(),
}))
jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
}))
jest.mock('../utils', () => ({
  isDevelopment: true,
}))

import Validator from '@/app/validator'
import loginService from '@/app/login.service'
import { createSession } from '@/app/session'
import { redirect } from 'next/navigation'

const mockValidatorInstance = {
  object: jest.fn().mockReturnThis(),
  string: jest.fn().mockReturnThis(),
  email: jest.fn().mockReturnThis(),
  safeParse: jest.fn(),
}
;(Validator as jest.Mock).mockImplementation(() => mockValidatorInstance)

describe('login()', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('returns validation error if email is invalid', async () => {
    mockValidatorInstance.safeParse.mockReturnValueOnce({
      success: false,
      error: {
        fieldErrors: {
          email: ['Invalid email'],
        },
      },
    })

    const formData = new FormData()
    formData.set('email', 'invalid-email')
    formData.set('password', 'password123')

    const result = await login(undefined, formData)

    expect(result).toEqual({
      errors: {
        email: ['Invalid email'],
      },
    })
  })

  it('returns message if loginService throws AuthError', async () => {
    mockValidatorInstance.safeParse.mockReturnValueOnce({ success: true })

    const error = new AuthError('User not found')
    ;(loginService.login as jest.Mock).mockRejectedValueOnce(error)

    const formData = new FormData()
    formData.set('email', 'user@example.com')
    formData.set('password', 'wrongpassword')

    const result = await login(undefined, formData)

    expect(result).toEqual({
      message: 'Login failed: User not found',
    })
  })

  it('returns generic message if loginService throws other error', async () => {
    mockValidatorInstance.safeParse.mockReturnValueOnce({ success: true })

    ;(loginService.login as jest.Mock).mockRejectedValueOnce(new Error('Unexpected'))

    const formData = new FormData()
    formData.set('email', 'user@example.com')
    formData.set('password', 'wrongpassword')

    const result = await login(undefined, formData)

    expect(result).toEqual({
      message: 'Login failed',
    })
  })

  it('calls createSession and redirects if login succeeds', async () => {
    mockValidatorInstance.safeParse.mockReturnValueOnce({ success: true })

    ;(loginService.login as jest.Mock).mockResolvedValueOnce({ email: 'user@example.com' })
    ;(createSession as jest.Mock).mockResolvedValueOnce(undefined)

    const formData = new FormData()
    formData.set('email', 'user@example.com')
    formData.set('password', 'password123')

    await login(undefined, formData)

    expect(loginService.login).toHaveBeenCalledWith('user@example.com', 'password123')
    expect(createSession).toHaveBeenCalledWith('user@example.com')
    expect(redirect).toHaveBeenCalledWith('/dashboard')
  })
})

