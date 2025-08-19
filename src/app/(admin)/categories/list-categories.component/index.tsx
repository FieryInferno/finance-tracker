import CategoryItem from './category-item.component'
import { read } from '../_actions/actions'

export default async function ListCategories() {
  const categories = await read()

  return (
    <ul className='m-0 p-0 list-none'>
      {categories.map((category) => (
        <CategoryItem
          {...category}
          key={`category-item-${category.id_category}`}
        />
      ))}
    </ul>
  )
}
