import styles from './page.module.css'
import { read } from '@/app/(admin)/actions/categories'

export default async function CreateTransactionPage() {
  const categories = await read()

  return (
    <div className='m-auto p-4 max-w-[400px]'>
      <h2 className='font-bold text-2xl text-center'>Tambah Transaksi</h2>
      <form className='flex flex-col gap-3'>
        <label>Tanggal</label>
        <input
          className={styles.input}
          type='date'
          name='tanggal'
          required
        />

        <label>Nominal</label>
        <input
          className={styles.input}
          type='number'
          name='nominal'
          placeholder='Contoh: 25000'
          required
        />

        <label>Kategori</label>
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
          {categories.map((category) => (
            <option
              key={`category-${category.id_category}`}
              value={category.id_category}
            >
              {category.name}
            </option>
          ))}
        </select>

        <label>Catatan</label>
        <input
          className={styles.input}
          type='text'
          name='catatan'
          placeholder='Opsional'
        />

        <label>Foto Bukti</label>
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
    </div>
  )
}
