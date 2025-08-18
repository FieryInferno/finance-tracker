'use client'

// import { deleteCategory } from '../../_actions/actions'

export default function ButtonDeleteCategory() {
  const onclick = async () => {
    const confirmed = confirm('Are you sure?')

    // if (confirmed) console.log(await deleteCategory())
  }

  return <button className="bg-[#ef4444] hover:bg-[#dc2626] px-3 py-1.5 border-none rounded-md text-white cursor-pointer" onClick={onclick}>Delete</button>
}