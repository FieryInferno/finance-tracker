import styles from './category-item.module.css'
import ButtonDeleteCategory from './components/button-delete-category.component'

export default function CategoryItem({
  color,
  name,
  id_category
}: {
  color: string
  name: string
  id_category: string
}) {
  return (
    <li className={styles['kategori-item']}>
      <span
        className={styles['kategori-warna']}
        style={{ backgroundColor: color }}
      ></span>
      <span className={styles['kategori-nama']}>{name}</span>
      <ButtonDeleteCategory id_category={id_category} />
    </li>
  )
}
