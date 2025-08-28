import ITransactionRepository from './transaction.repository.interface'
import ARepository from '@/app/(admin)/repository.abstract'
import Transaction from '../transaction.entity'
import { TTransaction } from '../types'
import { v4 as uuidv4 } from 'uuid'

export default class TransactionRepository
  extends ARepository
  implements ITransactionRepository
{
  /**
   * Creates a new transaction record by sending the provided transaction data to a Google Sheet via a POST request.
   *
   * @param {TTransaction} param0 - The transaction data to be created, including date, amount, category ID, note, and photo.
   * @returns {Promise<{ data: TTransaction | null; error: string | null }>} 
   *          A promise that resolves to an object containing the created transaction data or an error message.
   */
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

  /**
   * Reads transaction data from the 'TRANSACTIONS' source and maps each entry to a `Transaction` instance.
   *
   * @returns A promise that resolves to an array of `Transaction` objects.
   */
  read = async () => await this._read<Array<Array<string>>, TTransaction[]>('TRANSACTIONS', (data) =>
    (data.values ?? []).map(([id_transaction, date, amount, id_category, note]) =>
      Transaction.fromJson({ id_transaction, date, amount: +amount, id_category, note })
    )
  )
}
