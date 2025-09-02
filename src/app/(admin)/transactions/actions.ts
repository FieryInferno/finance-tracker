'use server'

import transactionService from './transaction.service'

export const getTransactions = async () => await transactionService.read()
