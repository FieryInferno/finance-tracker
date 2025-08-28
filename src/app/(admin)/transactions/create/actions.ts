'use server'

import { z } from 'zod'
import transactionService from '../transaction.service'
import { TTransaction } from '../types'

const schema = z.object({
  date: z.string(),
  amount: z.number(),
  id_category: z.string(),
  note: z.string().optional(),
  photo: z.instanceof(File).optional()
})

/**
 * Creates a new transaction using the provided form data.
 *
 * This function parses the form data, validates it against the transaction schema,
 * and attempts to create a new transaction using the transaction service.
 *
 * @param data - The form data containing transaction details.
 * @returns An object containing either the created transaction data or validation errors.
 */
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
