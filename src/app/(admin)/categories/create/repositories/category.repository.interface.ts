import { Category } from '@/app/(admin)/categories/create/types'
import RepositoryInterface from '@/app/repositories/repository.interface'

export default interface CategoryRepositoryInterface extends RepositoryInterface {
  create: (name: string, color: string) => Promise<Category | { error: string }>
}