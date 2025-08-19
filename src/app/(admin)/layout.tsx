import Navbar from './navbar.component'

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className='p-4 mb-12'>{children}</div>
      <Navbar />
    </>
  )
}
