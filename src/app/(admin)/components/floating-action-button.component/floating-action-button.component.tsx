import Link from 'next/link'
import styles from './index.module.css'

export default function FloatingActionButton(params: {
  children: React.ReactNode
  href: string
}) {
  return (
    <Link
      className={styles.fab}
      href={params.href}
    >
      {params.children}
    </Link>
  )
}
