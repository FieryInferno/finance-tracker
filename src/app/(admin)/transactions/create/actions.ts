'use server'

import { z } from 'zod'
import transactionService from './transaction.service'
import { TTransaction } from './types'

const schema = z.object({
  date: z.string(),
  amount: z.number(),
  id_category: z.string(),
  note: z.string().optional(),
  photo: z.instanceof(File).optional()
})
export const create = async (data: FormData) => {
  const rawData = Object.fromEntries(data)
  const dataTransaction: TTransaction = {
    date: String(rawData.date),
    amount: Number(rawData.amount),
    id_category: String(rawData.id_category),
    note: String(rawData.note),
    photo: rawData.photo as File
  }
  const result = schema.safeParse(dataTransaction)

  if (!result.success) {
    const flattened = z.flattenError(result.error)

    return { error: flattened.fieldErrors }
  }

  const transaction = await transactionService.create(dataTransaction)

  return { data: transaction }
}
