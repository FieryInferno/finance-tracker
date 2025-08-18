import styles from './category-item.module.css'
import ButtonDeleteCategory from './components/button-delete-category.component'

export default function CategoryItem({ color, name }: { color: string, name: string }) {
  return (
    <li className={styles['kategori-item']}>
      <span className={styles['kategori-warna']} style={{backgroundColor: color}}></span>
      <span className={styles['kategori-nama']}>{name}</span>
      <ButtonDeleteCategory />
    </li>
  )
}