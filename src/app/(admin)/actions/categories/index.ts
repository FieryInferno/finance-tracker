'use server'

import Validator from '@/app/validator'
import categoryService from '@/app/(admin)/categories/category.service'
import { isDevelopment } from '@/app/utils'
import { FormCategoryState } from '../../categories/types'
import { Category } from '../../types'
import { revalidatePath } from 'next/cache'

export const create = async (
  state: void | FormCategoryState,
  formData: FormData
): Promise<FormCategoryState> => {
  const CategorySchema = new Validator().object({
    name: new Validator().string(),
    color: new Validator().string()
  })
  const validatedFields = CategorySchema.safeParse({
    name: formData.get('name'),
    color: formData.get('color')
  })

  if (!validatedFields.success)
    return { errors: validatedFields.error.fieldErrors }

  try {
    const data = await categoryService.create(
      formData.get('name')! as string,
      formData.get('color')! as string
    )

    return { data }
  } catch (error) {
    if (isDevelopment) console.error(error)

    return { error: 'Failed create category' }
  }
}
export const read = async (): Promise<Category[]> => {
  const categories = await categoryService.read()

  return JSON.parse(JSON.stringify(categories))
}
export const deleteCategory = async (id: string) => {
  const response = await categoryService.delete(id)

  revalidatePath('/categories')
  return response
}
