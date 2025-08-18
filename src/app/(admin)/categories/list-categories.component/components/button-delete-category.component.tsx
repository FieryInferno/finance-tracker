'use client'

import Swal from 'sweetalert2'

// import { deleteCategory } from '../../_actions/actions'

export default function ButtonDeleteCategory() {
  const onclick = async () => {
    const result = await Swal.fire({
      title: 'Are you sure!',
      text: 'Do you want to delete this category?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    })

    if (result.isConfirmed) {
      // User clicked "Yes!", proceed with deletion
      // console.log(await deleteCategory())
    }
  }

  return <button className="bg-[#ef4444] hover:bg-[#dc2626] px-3 py-1.5 border-none rounded-md text-white cursor-pointer" onClick={onclick}>Delete</button>
}