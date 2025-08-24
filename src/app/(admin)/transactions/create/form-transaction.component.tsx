'use client'

import { Category } from '../../types'
import { showConfirmation } from '@/app/(admin)/utils'
import styles from './form-transaction.module.css'
import toast from 'react-hot-toast'

export default function FormTransactionPage(params: { categories: Category[] }) {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const confirmed = await showConfirmation('Do you want to save this transaction?', 'Yes, save it!')

    if (!confirmed) return

    try {
      debugger
      await new Promise((resolve) => setTimeout(resolve, 2000))
      toast.success('Transaction saved successfully')
    } catch (error) {
      console.error('Error saving transaction:', error)
      toast.error('Failed to save transaction')
    }
  }

  return (
    <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
      <label className={styles.label}>Tanggal</label>
      <input
        className={styles.input}
        type='date'
        name='tanggal'
        required
      />

      <label className={styles.label}>Nominal</label>
      <input
        className={styles.input}
        type='number'
        name='nominal'
        placeholder='Contoh: 25000'
        required
      />
      <label className={styles.label}>Kategori</label>
      <select
        className={styles.input}
        name='kategori'
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

      <label className={styles.label}>Catatan</label>
      <input
        className={styles.input}
        type='text'
        name='catatan'
        placeholder='Opsional'
      />

      <label className={styles.label}>Foto Bukti</label>
      <input
        className={styles.input}
        type='file'
        name='foto'
        accept='image/*'
      />

      <button
        type='submit'
        className={`${styles.input} bg-[#4caf50] text-white font-bold cursor-pointer hover:bg-[#45a049]`}
      >
        Simpan Transaksi
      </button>
    </form>
  )
}
