import Navbar from './components/navbar.component/index'
import { Toaster } from 'react-hot-toast'

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className='mb-12 p-4'>{children}</div>
      <Navbar />
      <Toaster position='top-right' />
    </>
  )
}
