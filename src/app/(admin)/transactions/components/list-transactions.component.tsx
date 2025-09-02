import ItemTransaction from './item-transaction.component'
import EmptyPage from './empty-page.component'
import { TTransaction } from '../types'
import { getTransactions } from '../actions'

export default async function ListTransactions() {
  const transactions: TTransaction[] = await getTransactions()

  return transactions.length !== 0 ? (
    <EmptyPage
      title='No Transactions Found'
      subtitle='Your transaction history will appear here once you start recording them.'
      titleButton='Add Transaction'
      href='/transactions/create'
    />
  ) : (
    <ul className='m-0 p-0 list-none'>
      {transactions.map((transaction) => (
        <ItemTransaction
          key={`transaction-${transaction.id_transaction}`}
          date={transaction.date}
          category={transaction.category!}
          note={transaction.note}
          amount={transaction.amount}
        />
      ))}
    </ul>
  )
}
