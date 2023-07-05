// import { useQuery } from "react-query"
// import { api } from "../services/api"

// type GetTransactionsResponse = {
//   totalCount: number;
//   transactions: Transaction[]
// }

// interface Transaction {
//   id: string
//   title: string
//   amount: number
//   type: string
//   category: string
//   createdAt: Date
//   userId: string
// }

// export async function getTransactions(page: number): Promise<GetTransactionsResponse> {
//   const { data, headers } = await api.get('/transactions/get-all-user-transaction', {
//     params: {
//       page,
//     }
//   })

//   const totalCount = Number(headers['x-total-count'])

//   const transactions = data.transactions.map((transaction: Transaction) => {
//     return {
//       id: transaction.id,
//       title: transaction.title,
//       amount: transaction.amount,
//       category: transaction.category,
//       type: transaction.type,
//       createdAt: transaction.createdAt
//     }
//   })
//   console.log(transactions, totalCount)
//   return {
//     transactions,
//     totalCount
//   }
// }

// export function useTable(page: number) {
//   return useQuery('transactions-user', () => getTransactions(page), {
//     staleTime: 1000 * 5, // 5 seconds
//   })
// }