import FormTransaction from './form-transaction.component'
import { read } from '../../actions/categories'
import { create } from './actions'

export default async function CreateTransactionPage() {
  const categories = await read()

  return (
    <div className='m-auto p-4 max-w-[400px]'>
      <h2 className='font-bold text-2xl text-center'>Tambah Transaksi</h2>
      <FormTransaction
        categories={categories}
        create={create}
      />
    </div>
  )
}
