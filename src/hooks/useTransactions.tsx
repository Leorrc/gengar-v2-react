import { useQuery } from "react-query"
import { api } from "../services/api"

type Transaction = {
  id: string
  title: string
  amount: number
  type: string
  category: string
  createdAt: Date
  userId: string
}

async function getTransactions() {
  const { data } = await api.get(`transactions/get-all-user-transaction/`)

  const transactionsGet = data.transaction.map((t: Transaction) => {
    return {
      id: t.id,
      title: t.title,
      amount: t.amount,
      type: t.type,
      category: t.category,
      createdAt: t.createdAt
    }
  })

  return transactionsGet
}

export function useTransactions() {
  return useQuery('transactions', getTransactions, {
    staleTime: 1000 * 22, // 5 seconds
  })
}