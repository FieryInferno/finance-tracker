import Swal from "sweetalert2"

export const showConfirmation = async (text: string, confirmButtonText: string) => {
  const result = await Swal.fire({
    title: 'Are you sure!',
    text: text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: confirmButtonText
  })

  return result.isConfirmed
}