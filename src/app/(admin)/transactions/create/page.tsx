import dynamic from 'next/dynamic'
import { read } from '../../actions/categories'

const FormTransaction = dynamic(() => import('./form-transaction.component'))

export default async function CreateTransactionPage() {
  const categories = await read()

  return (
    <div className='m-auto p-4 max-w-[400px]'>
      <h2 className='font-bold text-2xl text-center'>Tambah Transaksi</h2>
      <FormTransaction categories={categories} />
    </div>
  )
}
