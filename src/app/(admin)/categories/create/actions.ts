'use server'

import Validator from "@/app/validator";
import categoryService from '@/app/(admin)/categories/create/category.service'
import { isDevelopment } from "@/app/utils";
import { Category } from "./types";

type FormCategoryState = { errors?: { name?: string[], color?: string[] } }
const CategorySchema = new Validator().object({ name: new Validator().string(), color: new Validator().string() })

/**
 * Handles the creation of a category by validating form data and calling the category service.
 *
 * @param state - Optional state object used for tracking form validation state and messages.
 *                Typically includes field-level errors (`name`, `color`) and optional message.
 * @param formData - The form data submitted from the client, expected to contain `name` and `color` fields.
 *
 * @returns A promise that resolves to either:
 * - An object with validation errors if input is invalid.
 * - An object with an error message if the category creation fails.
 * - A `Category` object if creation is successful.
 *
 * @example
 * ```ts
 * const result = await createCategory(undefined, formData);
 * if ('errors' in result) {
 *   // Handle validation errors
 * } else if ('message' in result) {
 *   // Handle creation failure
 * } else {
 *   // Successfully created category
 * }
 * ```
 */
export const createCategory = async (
  state: void | FormCategoryState | undefined,
  formData: FormData
): Promise<{ message?: string } & FormCategoryState | Category> => {
  const validatedFields = CategorySchema.safeParse({ name: formData.get('name'), color: formData.get('color') })

  if (!validatedFields.success) return { errors: validatedFields.error.fieldErrors }

  try {
    const data = await categoryService.create(formData.get('name')! as string, formData.get('color')! as string)

    return data
  } catch (error) {
    if (isDevelopment) console.error(error)

    return { message: 'Failed create category' }
  }
}
