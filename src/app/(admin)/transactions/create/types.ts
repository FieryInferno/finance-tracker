export type TTransaction = {
  id_transaction?: number
  date: string
  amount: number
  id_category: string
  note?: string
  photo?: File
  url_photo?: string
}
