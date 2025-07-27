import { User } from '@/app/types'

interface Repository {
  get(params?: Record<string, string>): any
}
export default interface UserRepositoryInterface extends Repository {
  get(params?: { email?: string }): Promise<User | null>
}