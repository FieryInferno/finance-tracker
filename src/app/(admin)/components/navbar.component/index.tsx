import Link from 'next/link'
import stylesNavbar from './navbar.module.css'

type Menu = {
  title: string
  href?: string
}

const MENUS: Menu[] = [
  { href: '/dashboard', title: 'Dashboard' },
  { href: '/transactions', title: 'Transactions' },
  { href: '/categories', title: 'Categories' },
  { title: 'Logout' }
]

export default function Navbar() {
  return (
    <nav className={stylesNavbar['responsive-nav']}>
      {MENUS.map(({ href, ...menu }, index) => (
        <Link
          href={href ?? ''}
          key={`menu-${index}`}
        >
          {menu.title}
        </Link>
      ))}
    </nav>
  )
}
