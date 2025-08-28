import { Category } from '../types'
import CategoryRepositoryInterface from '@/app/(admin)/categories/repositories/category.repository.interface'

export default class CategoryUseCase {
  private categoryRepository: CategoryRepositoryInterface

  constructor(categoryRepository: CategoryRepositoryInterface) {
    this.categoryRepository = categoryRepository
  }
  private async handleResponse<T>(
    promise: Promise<{ data: T | null; error: string | null }>
  ): Promise<T> {
    const { error, ...response } = await promise

    if (error) throw new Error(error)

    return response.data as T
  }

  create = async (name: string, color: string): Promise<Category> =>
    this.handleResponse(this.categoryRepository.create(name, color))
  read = async (): Promise<Category[]> =>
    await this.handleResponse<Category[]>(this.categoryRepository.read())
  delete = async (id_category: string) =>
    await this.handleResponse<string>(
      this.categoryRepository.delete(id_category)
    )
}
