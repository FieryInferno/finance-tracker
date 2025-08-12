import { create } from './actions'
import categoryService from '@/app/(admin)/categories/category.service'
import Validator from '@/app/validator'
import { isDevelopment } from '@/app/utils'

jest.mock('@/app/(admin)/categories/create/category.service', () => ({
  create: jest.fn(),
}))
jest.mock('@/app/validator')
jest.mock('@/app/utils', () => ({
  isDevelopment: true,
}))

const mockValidatorInstance = {
  object: jest.fn().mockReturnThis(),
  string: jest.fn().mockReturnThis(),
  safeParse: jest.fn(),
}

;(Validator as jest.Mock).mockImplementation(() => mockValidatorInstance)

describe('create', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return validation errors if input is invalid', async () => {
    mockValidatorInstance.safeParse.mockReturnValueOnce({
      success: false,
      error: {
        fieldErrors: {
          name: ['Name is required'],
        },
      },
    })

    const formData = new FormData()
    formData.set('name', '')
    formData.set('color', 'red')

    const result = await create(undefined, formData)

    expect(result).toEqual({
      errors: {
        name: ['Name is required'],
      },
    })
  })

  it('should return category data if creation succeeds', async () => {
    mockValidatorInstance.safeParse.mockReturnValueOnce({ success: true })

    const mockCategory = { id: 1, name: 'Books', color: 'blue' }
    ;(categoryService.create as jest.Mock).mockResolvedValueOnce(mockCategory)

    const formData = new FormData()
    formData.set('name', 'Books')
    formData.set('color', 'blue')

    await create(undefined, formData)
    expect(categoryService.create).toHaveBeenCalledWith('Books', 'blue')
  })

  it('should return error message if creation fails', async () => {
    mockValidatorInstance.safeParse.mockReturnValueOnce({ success: true })
    ;(categoryService.create as jest.Mock).mockRejectedValueOnce(new Error('DB error'))

    const formData = new FormData()
    formData.set('name', 'Books')
    formData.set('color', 'blue')

    const result = await create(undefined, formData)

    expect(result).toEqual({ error: 'Failed create category' })
  })
})
