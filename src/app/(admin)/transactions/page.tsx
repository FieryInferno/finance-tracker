import styles from './page.module.css'

export default async function TransactionsPage() {
  return (
    <div className={styles['riwayat-container']}>
      <h2 className='font-bold text-3xl mb-4'>Riwayat Transaksi</h2>
      <ul className={styles['transaksi-list']}>
        <li className={styles['transaksi-item']}>
          <div className={styles['transaksi-info']}>
            <span className={styles['transaksi-tanggal']}>25 Juli 2025</span>
            <span className={styles['transaksi-kategori']}>Makanan</span>
            <span className={styles['transaksi-catatan']}>
              Beli nasi goreng
            </span>
            <a
              className={styles['bukti-link']}
              href='/uploads/bukti1.jpg'
              target='_blank'
            >
              View Receipt
            </a>
          </div>
          <div className={styles['transaksi-nominalKeluar']}>- Rp25.000</div>
        </li>
        <li className={styles['transaksi-item']}>
          <div className={styles['transaksi-info']}>
            <span className={styles['transaksi-tanggal']}>24 Juli 2025</span>
            <span className={styles['transaksi-kategori']}>Gaji</span>
            <span className={styles['transaksi-catatan']}>Gaji bulanan</span>
            <a
              className={styles['bukti-link']}
              href='/uploads/bukti1.jpg'
              target='_blank'
            >
              View Receipt
            </a>
          </div>
          <div className={styles['transaksi-nominalMasuk']}>+ Rp3.000.000</div>
        </li>
      </ul>
    </div>
  )
}
