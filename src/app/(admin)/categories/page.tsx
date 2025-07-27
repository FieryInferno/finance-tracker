import styles from './page.module.css'

export default async function CategoriesPage() {
  await new Promise((resolve) => setTimeout(() => resolve(true), 5000))
  return (
    <div className={styles['kategori-list-container']}>
      <h2 className='font-bold mb-4 text-2xl'>Your Categories</h2>
      <ul className={styles['kategori-list']}>
        <li className={styles['kategori-item']}>
          <span className={styles['kategori-warna']} style={{backgroundColor: '#F87171'}}></span>
          <span className={styles['kategori-nama']}>Food</span>
          <button className={styles['kategori-delete']}>Delete</button>
        </li>
        <li className={styles['kategori-item']}>
          <span className={styles['kategori-warna']} style={{backgroundColor: '#34D399'}}></span>
          <span className={styles['kategori-nama']}>Salary</span>
          <button className={styles['kategori-delete']}>Delete</button>
        </li>
      </ul>
      <button className={styles.fab}>+</button>
    </div>
  )
}