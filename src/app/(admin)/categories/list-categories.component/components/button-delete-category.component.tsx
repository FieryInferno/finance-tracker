'use client'

import Swal from 'sweetalert2'
import toast from 'react-hot-toast'
import { useActionState, startTransition } from 'react'
import { deleteCategory } from '../../_actions/actions'
import { isDevelopment } from '@/app/utils'

export default function ButtonDeleteCategory({
  id_category
}: {
  id_category: string
}) {
  const [, action, pending] = useActionState(deleteCategory, id_category)
  const onclick = async () => {
    const result = await Swal.fire({
      title: 'Are you sure!',
      text: 'Do you want to delete this category?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    })

    if (!result.isConfirmed) return

    try {
      startTransition(action)
      toast.success('Category deleted successfully')
    } catch (error) {
      if (isDevelopment) console.error(error)

      Swal.fire({
        title: 'Error!',
        text: 'Failed to delete category',
        icon: 'error'
      })
    }
  }

  return (
    <button
      className='bg-[#ef4444] hover:bg-[#dc2626] px-3 py-1.5 border-none rounded-md text-white cursor-pointer'
      onClick={onclick}
    >
      {pending ? 'Loading...' : 'Delete'}
    </button>
  )
}
