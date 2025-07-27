import styles from './loading.module.css'

export default function loading() {
  return (
    <div className={styles['dashboard-skeleton']}>
      <div className={styles['skeleton-title']}></div>
      <div className={styles['skeleton-totals']}>
        <div className={styles['skeleton-box']}></div>
        <div className={styles['skeleton-box']}></div>
        <div className={styles['skeleton-box']}></div>
      </div>
      <div className={styles['skeleton-filter']}></div>
      <div className={styles['skeleton-chart']}></div>
      <div className={styles['skeleton-list']}>
        <div className={styles['skeleton-row']}></div>
        <div className={styles['skeleton-row']}></div>
        <div className={styles['skeleton-row']}></div>
        <div className={styles['skeleton-row']}></div>
      </div>
    </div>
  )
}