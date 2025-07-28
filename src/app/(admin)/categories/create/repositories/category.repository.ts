import CategoryRepositoryInterface from '@/app/(admin)/categories/create/repositories/category.repository.interface'
import { Category } from '../types'

export default class CategoryRepository implements CategoryRepositoryInterface {
  async create(name: string, color: string) {
    return await new Promise((resolve) => resolve({ name, color })) as Category
  }
}