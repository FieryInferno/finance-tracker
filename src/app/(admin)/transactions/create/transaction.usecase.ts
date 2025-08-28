import UseCase from '@/app/(admin)/usecase.abstract'
import ITransactionRepository from './repositories/transaction.repository.interface'
import Transaction from './transaction.entity'
import { TTransaction } from './types'

interface ITransactionUseCase {
  create(data: TTransaction): Promise<TTransaction>
}
export default class TransactionUseCase
  extends UseCase<ITransactionRepository>
  implements ITransactionUseCase
{
  create = async (data: TTransaction) =>
    await this.handleResponse<TTransaction>(
      this.repository.create(new Transaction(data))
    )
}
