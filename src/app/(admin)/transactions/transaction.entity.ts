import { Category } from '../types'
import { TTransaction } from './types'

export default class Transaction implements TTransaction {
  id_transaction?: string
  date: string
  amount: number
  id_category: string
  category?: Category | undefined
  note?: string
  photo?: File

  constructor({
    id_transaction,
    date,
    amount,
    id_category,
    ...data
  }: TTransaction) {
    if (id_transaction) this.id_transaction = id_transaction
    if (!date) throw new Error('Transaction: "date" is required')
    if (isNaN(Date.parse(date)))
      throw new Error('Transaction: "date" must be a valid date string')
    if (Date.parse(date) > Date.now())
      throw new Error('Transaction: "date" cannot be in the future')
    if (!amount) throw new Error('Transaction: "amount" is required')
    if (isNaN(amount)) throw new Error('Transaction: "amount" must be a number')
    if (amount <= 0)
      throw new Error('Transaction: "amount" must be a positive number')
    if (!id_category) throw new Error('Transaction: "id_category" is required')

    this.date = date
    this.amount = +amount
    this.id_category = id_category
    this.category = data?.category
    this.note = data?.note
    this.photo = data?.photo
  }

  static fromJson = (json: TTransaction): Transaction => new Transaction(json)
}
