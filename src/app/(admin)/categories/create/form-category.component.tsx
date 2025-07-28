'use client'

import { useActionState } from 'react'
import styles from './form-category.component.module.css'

type FormStateCategory = (
  state: void | { errors?: { name?: string[], color?: string[] } } | undefined, formData: FormData
) => Promise<{ message?: string; errors?: { name?: string[], color?: string[] } }>

export default function FormCategory({ createCategory }: { createCategory: FormStateCategory }) {
  const [state, action, pending] = useActionState(createCategory, undefined)

  return (
    <form className={styles['form-kategori']} action={action}>
      <label>Category Name</label>
      <input type="text" name="name" placeholder="e.g. Groceries" required className={styles.input} />
      {state?.errors?.name?.map((error, index) => <li key={`error-color-${index}`}>{error}</li>)}
      <label>Color (optional)</label>
      <input type="color" name="color" defaultValue="#F87171" className={styles.input} />
      {state?.errors?.color?.map((error, index) => <li key={`error-color-${index}`}>{error}</li>)}
      <button type="submit" className={styles.button}>{pending ? 'Loading...' : 'Add Category'}</button>
    </form>
  )
}