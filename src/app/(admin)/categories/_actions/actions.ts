'use server'

import Validator from "@/app/validator";
import categoryService from '@/app/(admin)/categories/category.service'
import { isDevelopment } from "@/app/utils";
import { FormCategoryState, Category } from "../types";

export const create = async (
  state: void | FormCategoryState,
  formData: FormData
): Promise<FormCategoryState> => {
  const CategorySchema = new Validator().object({ name: new Validator().string(), color: new Validator().string() })
  const validatedFields = CategorySchema.safeParse({ name: formData.get('name'), color: formData.get('color') })

  if (!validatedFields.success) return { errors: validatedFields.error.fieldErrors }

  try {
    const data = await categoryService.create(formData.get('name')! as string, formData.get('color')! as string)

    return { data }
  } catch (error) {
    if (isDevelopment) console.error(error)

    return { error: 'Failed create category' }
  }
}
export const read = async (): Promise<Category[]> => await categoryService.read()
