import FormCategory from '@/app/(admin)/categories/create/form-category.component'
import { createCategory } from '@/app/(admin)/categories/create/actions'

export default function CreateCategoriesPage() {
  return (
    <div className='max-w-96 m-auto p-4'>
      <h2 className='font-bold text-2xl mb-4'>Add New Category</h2>
      <FormCategory createCategory={createCategory}/>
    </div>
  )
}