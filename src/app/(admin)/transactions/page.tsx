import styles from './page.module.css'
import EmptyPage from './components/empty-page.component'
import ItemTransaction from './components/item-transaction.component'
import { TTransaction } from './types'
import { getTransactions } from './actions'

export default async function TransactionsPage() {
  const transactions: TTransaction[] = await getTransactions()

  return transactions.length === 0 ? <EmptyPage
    title='No Transactions Found'
    subtitle='Your transaction history will appear here once you start recording them.'
    titleButton='Add Transaction'
    href='/transactions/create'
  /> :
  <div className={styles['riwayat-container']}>
    <h2 className='mb-4 font-bold text-3xl'>Riwayat Transaksi</h2>
    <ul className={styles['transaksi-list']}>
      {
        transactions.map((transaction) => <ItemTransaction
          key={`transaction-${transaction.id_transaction}`}
          date={transaction.date}
          category={transaction.id_category}
          note={transaction.note}
          amount={transaction.amount}
        />)
      }
    </ul>
  </div>
}
