import Navbar from "./navbar.component";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Navbar />
    </>
  )
}