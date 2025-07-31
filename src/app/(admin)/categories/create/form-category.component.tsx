'use client'

import { useActionState, useEffect } from 'react'
import styles from './form-category.component.module.css'
import { FormCategoryState } from './types';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

type FormCategory = (
  state: void | FormCategoryState, formData: FormData
) => Promise<FormCategoryState>

export default function FormCategory({ createCategory }: { createCategory: FormCategory }) {
  const [state, action, pending] = useActionState(createCategory, undefined)
  const router = useRouter()

  useEffect(() => {
    if (state?.data) {
      toast.success('Success create category')

      const timer = setTimeout(() => router.push('/categories'), 2000);

      return () => clearTimeout(timer)
    }
  }, [state])

  return (
    <>
      {
        state?.error && <div className="flex items-center p-4 mb-4 text-sm text-red-800 bg-red-100 rounded-lg" role="alert">
          <svg className="w-5 h-5 mr-2 text-red-600" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13H9v6h2V5zm0 8H9v2h2v-2z" clip-rule="evenodd" />
          </svg>
          <span className="font-medium">Error!&nbsp;</span> {state.error}
        </div>
      }
      <Toaster position='top-right' />
      <form className={styles['form-kategori']} action={action}>
        <label>Category Name</label>
        <input type="text" name="name" placeholder="e.g. Groceries" required className={styles.input} />
        {state?.errors?.name?.map((error, index) => <li key={`error-color-${index}`}>{error}</li>)}
        <label>Color (optional)</label>
        <input type="color" name="color" defaultValue="#F87171" className={styles.input} />
        {state?.errors?.color?.map((error, index) => <li key={`error-color-${index}`}>{error}</li>)}
        <button type="submit" className={styles.button}>{pending ? 'Loading...' : 'Add Category'}</button>
      </form>
    </>
  )
}