import styles from './page.module.css'

export default function CreateCategoriesPage() {
  return (
    <div className={styles['kategori-container']}>
      <h2 className='font-bold text-2xl'>Add New Category</h2>
      <form className={styles['form-kategori']}>
        <label>Category Name</label>
        <input type="text" name="nama" placeholder="e.g. Groceries" required className={styles.input} />
        <label>Color (optional)</label>
        <input type="color" name="warna" defaultValue="#F87171" className={styles.input} />
        <button type="submit" className={styles.button}>Add Category</button>
      </form>
    </div>
  )
}