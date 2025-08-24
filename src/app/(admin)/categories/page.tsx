import React from 'react'
import styles from './page.module.css'
import dynamic from 'next/dynamic'
import Error from './error'
import Loading from './loading'
import FloatingActionButton from '../components/floating-action-button.component/floating-action-button.component'
import { ErrorBoundary } from './error-boundary'

const ListCategories = dynamic(
  () => import(`./list-categories.component/index`),
  { loading: () => <Loading /> }
)

export default async function CategoriesPage() {
  return (
    <div className={styles['kategori-list-container']}>
      <h2 className='mb-4 font-bold text-2xl'>Your Categories</h2>
      <ErrorBoundary FallbackComponent={Error}>
        <ListCategories />
      </ErrorBoundary>
      <FloatingActionButton href='/categories/create'>+</FloatingActionButton>
    </div>
  )
}
