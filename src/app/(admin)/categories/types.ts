export type Category = { name: string, color: string }
export type FormCategoryState = { data?: Category, error?: string; errors?: { name?: string[], color?: string[] } }