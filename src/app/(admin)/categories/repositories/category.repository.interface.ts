import { Category } from '@/app/(admin)/categories/types'
import RepositoryInterface from '@/app/repositories/repository.interface'

export default interface CategoryRepositoryInterface
  extends RepositoryInterface {
  create: (
    name: string,
    color: string
  ) => Promise<{ data: Category | null; error: string | null }>
  read: () => Promise<{ data: Category[] | null; error: string | null }>
  delete: (
    id_category: string
  ) => Promise<{ data: string | null; error: string | null }>
}
