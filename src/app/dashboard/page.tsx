import styles from './page.module.css'

export default function page() {
  return (
    <div className={styles['dashboard-container']}>
      <h2 className='text-3xl mb-4'>Overview</h2>
      <div className={styles['summary-cards']}>
        <div className={styles.cardPemasukan}>
          <h3 className={styles.cardH3}>Total Income</h3>
          <p className={styles.cardP}>Rp 3,000,000</p>
        </div>
        <div className={styles.cardPengeluaran}>
          <h3 className={styles.cardH3}>Total Expense</h3>
          <p className={styles.cardP}>Rp 750,000</p>
        </div>
        <div className={styles.cardSaldo}>
          <h3 className={styles.cardH3}>Balance</h3>
          <p className={styles.cardP}>Rp 2,250,000</p>
        </div>
      </div>
    </div>
  )
}