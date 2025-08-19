import UserRepository from './user.repository'

jest.mock('@/app/utils', () => ({
  isDevelopment: true
}))

describe('UserRepository', () => {
  const originalFetch = global.fetch

  afterEach(() => {
    global.fetch = originalFetch // restore original fetch after each test
    jest.clearAllMocks()
  })

  it('should return a user when email matches', async () => {
    const mockData = {
      values: [
        ['test@example.com', 'password123'],
        ['other@example.com', 'pass456']
      ]
    }

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => mockData
    })

    const repo = new UserRepository()
    const user = await repo.get({ email: 'test@example.com' })

    expect(user).toEqual({ email: 'test@example.com', password: 'password123' })
  })

  it('should return null when email is not found', async () => {
    const mockData = {
      values: [['notmatch@example.com', 'password123']]
    }

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => mockData
    })

    const repo = new UserRepository()
    const user = await repo.get({ email: 'unknown@example.com' })

    expect(user).toBeNull()
  })

  it('should return null if matching data is malformed (length < 2)', async () => {
    const mockData = {
      values: [
        ['test@example.com'] // only email, no password
      ]
    }

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => mockData
    })

    const repo = new UserRepository()
    const user = await repo.get({ email: 'test@example.com' })

    expect(user).toBeNull()
  })

  it('should return null and log error when fetch fails', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
    global.fetch = jest.fn().mockRejectedValue(new Error('Fetch error'))

    const repo = new UserRepository()
    const user = await repo.get({ email: 'test@example.com' })

    expect(user).toBeNull()
    expect(consoleSpy).toHaveBeenCalled()
  })
})
