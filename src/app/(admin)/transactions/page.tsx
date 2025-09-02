import FloatingActionButton from '../components/floating-action-button.component/floating-action-button.component'
import Error from '../error'
import dynamic from 'next/dynamic'
import Loading from '../loading'
import { ErrorBoundary } from '../components/error-boundary'

const ListTransactions = dynamic(
  () => import('./components/list-transactions.component'),
  { loading: () => <Loading /> }
)

export default async function TransactionsPage() {
  return (
    <div className='mb-8 max-w-[600px] font-sans'>
      <h2 className='mb-4 font-bold text-3xl'>Riwayat Transaksi</h2>
      <ErrorBoundary FallbackComponent={Error}>
        <ListTransactions />
      </ErrorBoundary>
      <FloatingActionButton href='/transactions/create'>+</FloatingActionButton>
    </div>
  )
}
