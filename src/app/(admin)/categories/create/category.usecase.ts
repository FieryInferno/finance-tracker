import { Category } from '@/app/(admin)/categories/create/types'
import CategoryRepositoryInterface from '@/app/(admin)/categories/create/repositories/category.repository.interface'

export default class CategoryUseCase {
  private categoryRepository: CategoryRepositoryInterface

  constructor(categoryRepository: CategoryRepositoryInterface) {
    this.categoryRepository = categoryRepository
  }
  async create(name: string, color: string): Promise<Category> {
    const response = await this.categoryRepository.create(name, color)

    if ('error' in response) throw new Error(response.error)

    return response
  }
}