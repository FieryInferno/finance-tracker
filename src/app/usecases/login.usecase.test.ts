import LoginUseCase from './login.usecase'
import AuthError from '@/app/auth.error'
import { User } from '@/app/types'

// Mocking the UserRepositoryInterface
const mockUserRepository = {
  get: jest.fn()
}

describe('LoginUseCase', () => {
  let loginUseCase: LoginUseCase

  beforeEach(() => {
    loginUseCase = new LoginUseCase(mockUserRepository)
    jest.clearAllMocks()
  })

  it('should return user if email and password are correct', async () => {
    const mockUser: User = { email: 'test@example.com', password: 'secure123' }

    mockUserRepository.get.mockResolvedValue(mockUser)

    const result = await loginUseCase.login('test@example.com', 'secure123')

    expect(result).toEqual(mockUser)
    expect(mockUserRepository.get).toHaveBeenCalledWith({
      email: 'test@example.com'
    })
  })

  it('should throw AuthError if user not found', async () => {
    mockUserRepository.get.mockResolvedValue(null)

    await expect(
      loginUseCase.login('notfound@example.com', 'irrelevant')
    ).rejects.toThrow(AuthError)

    await expect(
      loginUseCase.login('notfound@example.com', 'irrelevant')
    ).rejects.toThrow('User not found')
  })

  it('should throw AuthError if password is incorrect', async () => {
    const mockUser: User = {
      email: 'test@example.com',
      password: 'correctPassword'
    }

    mockUserRepository.get.mockResolvedValue(mockUser)

    await expect(
      loginUseCase.login('test@example.com', 'wrongPassword')
    ).rejects.toThrow(AuthError)

    await expect(
      loginUseCase.login('test@example.com', 'wrongPassword')
    ).rejects.toThrow('Password is incorrect')
  })
})
