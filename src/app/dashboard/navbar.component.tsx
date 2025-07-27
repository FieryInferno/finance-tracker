import Link from 'next/link'
import stylesNavbar from './navbar.module.css'

export default function Navbar() {
  return (
    <nav className={stylesNavbar['responsive-nav']}>
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/transactions">Transactions</Link>
      <Link href="#categories">Categories</Link>
      <Link href="#logout">Logout</Link>
    </nav>
  )
}