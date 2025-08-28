'use client'

import styles from './form-transaction.module.css'
import toast from 'react-hot-toast'
import { TTransaction } from '../types'
import { startTransition, useActionState } from 'react'
import { Category } from '../../types'
import { showConfirmation } from '@/app/(admin)/utils'
import { useRouter } from 'next/navigation'

type TFormTransaction =
  | { error: { [key: string]: string[] }; data?: undefined }
  | { data: TTransaction; error?: undefined }
export default function FormTransactionPage(params: {
  categories: Category[]
  create: (data: FormData) => Promise<TFormTransaction>
}) {
  const router = useRouter()
  const createTransaction = async (
    state: TFormTransaction,
    formData: FormData
  ) => {
    state = await params.create(formData)

    if (!('error' in state)) {
      toast.success('Transaction saved successfully')
      setTimeout(() => router.push('/transactions'), 2000)
    }
    if (state.error) toast.error('Please check the form for errors')

    return state
  }
  const [state, formAction, pending] = useActionState(createTransaction, {
    error: {},
    data: undefined
  })
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const confirmed = await showConfirmation(
      'Do you want to save this transaction?',
      'Yes, save it!'
    )

    if (!confirmed) return

    try {
      startTransition(() =>
        formAction(new FormData(event.target as HTMLFormElement))
      )
    } catch (error) {
      console.error('Error saving transaction:', error)
      toast.error('Failed to save transaction')
    }
  }

  return (
    <form
      className='flex flex-col gap-3'
      onSubmit={handleSubmit}
    >
      <div>
        <label className={styles.label}>Tanggal</label>
        <input
          className={`${styles.input} ${state.error && state.error.date ? styles['invalid-input'] : ''}`}
          type='date'
          name='date'
          required
        />
        {state.error && state.error.date && (
          <div className={styles['invalid-feedback']}>
            {state.error.date.join(', ')}
          </div>
        )}
      </div>
      <div>
        <label className={styles.label}>Nominal</label>
        <input
          className={`${styles.input} ${state.error && state.error.amount ? styles['invalid-input'] : ''}`}
          type='number'
          name='amount'
          placeholder='Contoh: 25000'
          required
        />
        {state.error && state.error.amount && (
          <div className={styles['invalid-feedback']}>
            {state.error.amount.join(', ')}
          </div>
        )}
      </div>
      <div>
        <label className={styles.label}>Kategori</label>
        <select
          className={`${styles.input} ${state.error && state.error.amount ? styles['invalid-input'] : ''}`}
          name='id_category'
          defaultValue=''
        >
          <option
            value=''
            disabled
          >
            Pilih Kategori
          </option>
          {params.categories.map((category) => (
            <option
              key={`category-${category.id_category}`}
              value={category.id_category}
            >
              {category.name}
            </option>
          ))}
        </select>
        {state.error && state.error.category && (
          <div className={styles['invalid-feedback']}>
            {state.error.category.join(', ')}
          </div>
        )}
      </div>

      <label className={styles.label}>Catatan</label>
      <input
        className={styles.input}
        type='text'
        name='note'
        placeholder='Opsional'
      />

      <label className={styles.label}>Foto Bukti</label>
      <input
        className={styles.input}
        type='file'
        name='photo'
        accept='image/*'
      />

      <button
        type='submit'
        className={`${styles.input} bg-[#4caf50] text-white font-bold cursor-pointer hover:bg-[#45a049]`}
        disabled={pending}
      >
        {pending ? 'Menyimpan...' : 'Simpan Transaksi'}
      </button>
    </form>
  )
}
