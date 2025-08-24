import { Category } from "../types"

export type FormCategoryState = {
  data?: Category
  error?: string
  errors?: { name?: string[]; color?: string[] }
}
