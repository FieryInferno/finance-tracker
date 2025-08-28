import { TTransaction } from '../types'

export default interface ITransactionRepository {
  create(
    data: TTransaction
  ): Promise<{ data: TTransaction | null; error: string | null }>
}
