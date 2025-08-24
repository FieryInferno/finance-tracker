import FormCategory from '@/app/(admin)/categories/create/form-category.component'
import { create } from '@/app/(admin)/actions/categories'

export default function CreateCategoriesPage() {
  return (
    <div className='m-auto p-4 max-w-96'>
      <h2 className='mb-4 font-bold text-2xl'>Add New Category</h2>
      <FormCategory createCategory={create} />
    </div>
  )
}
