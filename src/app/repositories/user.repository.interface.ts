import { User } from '@/app/types'
import RepositoryInterface from '@/app/repositories/repository.interface'

export default interface UserRepositoryInterface extends RepositoryInterface {
  get(params?: { email?: string }): Promise<User | null>
}