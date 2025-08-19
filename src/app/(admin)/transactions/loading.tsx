import styles from './loading.module.css'

export default function TransactionLoading() {
  return (
    <div className={styles['transaction-skeleton']}>
      <div className={styles['skeleton-header']}></div>

      <div className={styles['skeleton-button']}></div>

      <div className={styles['skeleton-rows']}>
        <div className={styles['skeleton-row']}></div>
        <div className={styles['skeleton-row']}></div>
        <div className={styles['skeleton-row']}></div>
        <div className={styles['skeleton-row']}></div>
      </div>
    </div>
  )
}
