import TransactionRepository from './repositories/transaction.repository'
import TransactionUseCase from './transaction.usecase'

const transactionService = new TransactionUseCase(new TransactionRepository())

export default transactionService
