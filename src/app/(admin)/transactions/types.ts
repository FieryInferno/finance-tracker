import { Category } from '../types'

export type TTransaction = {
  id_transaction?: string
  date: string
  amount: number
  id_category: string
  category?: Category
  note?: string
  photo?: File
  url_photo?: string
}
