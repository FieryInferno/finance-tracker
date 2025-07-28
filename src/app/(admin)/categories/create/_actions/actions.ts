'use server'

import Validator from "@/app/validator";
import categoryService from '@/app/(admin)/categories/create/category.service'
import { isDevelopment } from "@/app/utils";
import { Category } from "../types";
import { FormCategoryState } from "../types";

export const createCategory = async (
  state: void | FormCategoryState | undefined,
  formData: FormData
): Promise<FormCategoryState | Category> => {
  const CategorySchema = new Validator().object({ name: new Validator().string(), color: new Validator().string() })
  const validatedFields = CategorySchema.safeParse({ name: formData.get('name'), color: formData.get('color') })

  if (!validatedFields.success) return { errors: validatedFields.error.fieldErrors }

  try {
    const data = await categoryService.create(formData.get('name')! as string, formData.get('color')! as string)

    return data
  } catch (error) {
    if (isDevelopment) console.error(error)

    return { error: 'Failed create category' }
  }
}
