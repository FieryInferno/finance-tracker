import styles from './item-transaction.module.css'

export default function ItemTransaction({ note, ...params }: { date: string, category: string, note?: string, amount: number }) {
  return (
    <li className={styles['transaksi-item']}>
      <div className={styles['transaksi-info']}>
        <span className={styles['transaksi-tanggal']}>{params.date}</span>
        <span className={styles['transaksi-kategori']}>{params.category}</span>
        {note && <span className={styles['transaksi-catatan']}>{note}</span>}
        <a
          className={styles['bukti-link']}
          href='/uploads/bukti1.jpg'
          target='_blank'
        >
          View Receipt
        </a>
      </div>
      <div className={styles['transaksi-nominalKeluar']}>- Rp{params.amount}</div>
    </li>
  )
}