import styles from './layout.module.css'
import Link from 'next/link'

export default async function CategoriesLayout({ listCategories }: { listCategories: React.ReactNode }) {
  return (
    <div className={styles['kategori-list-container']}>
      <h2 className='mb-4 font-bold text-2xl'>Your Categories</h2>
      {listCategories}
      <Link className={styles.fab} href={'/categories/create'}>+</Link>
    </div>
  )
}