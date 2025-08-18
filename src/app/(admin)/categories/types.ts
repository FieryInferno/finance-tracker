export type Category = { id_category: string, name: string, color: string }
export type FormCategoryState = { data?: Category, error?: string; errors?: { name?: string[], color?: string[] } }