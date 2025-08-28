import ITransactionRepository from './transaction.repository.interface'
import ARepository from '@/app/(admin)/repository.abstract'
import { TTransaction } from '../types'
import { v4 as uuidv4 } from 'uuid'

export default class TransactionRepository
  extends ARepository
  implements ITransactionRepository
{
  async create({
    date,
    amount,
    id_category,
    note,
    photo
  }: TTransaction): Promise<{
    data: TTransaction | null
    error: string | null
  }> {
    const body = new FormData()
    const id_transaction = uuidv4()

    body.set('type', 'CREATE')
    body.set('sheet', 'TRANSACTIONS')
    body.set('id_transaction', id_transaction)
    body.set('date', date)
    body.set('amount', amount.toString())
    body.set('id_category', String(id_category))
    body.set('note', note ?? '')
    body.set('photo', photo ?? '')

    return await this.handleResponse<
      { values: Array<Array<string>> },
      TTransaction
    >(
      fetch(process.env.URL_POST_GOOGLE_SHEET!, { body, method: 'POST' }),
      () => ({ date, amount, id_category, note, photo })
    )
  }
}
