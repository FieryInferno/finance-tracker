import styles from './item-transaction.module.css'
import { Category } from '../../types'

export default function ItemTransaction({ note, ...params }: { date: string, category: Category, note?: string, amount: number }) {
  return (
    <li className={styles['transaksi-item']}>
      <div className={styles['transaksi-info']}>
        <span className={styles['transaksi-tanggal']}>{params.date}</span>
        <span className={`${styles['transaksi-kategori']} flex gap-1`}>
          <div className={`border border-black rounded-full w-4 h-4 bg-[${params.category.color}]`}></div>
          <div className={'leading-4'}>{params.category.name}</div>
        </span>
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