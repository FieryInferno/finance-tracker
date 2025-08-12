import styles from './category-item.module.css'

export default function CategoryItem({ color, name }: { color: string, name: string }) {
  return (
    <li className={styles['kategori-item']}>
      <span className={styles['kategori-warna']} style={{backgroundColor: color}}></span>
      <span className={styles['kategori-nama']}>{name}</span>
      <button className={styles['kategori-delete']}>Delete</button>
    </li>
  )
}