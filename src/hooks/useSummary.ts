// import { useMemo, useState } from "react"
// import { TransactionsContext } from "../contexts/TransactionsContext"
// import { useContextSelector } from "use-context-selector"
// import { api } from "../services/api"

// interface Summary {
//   deposit: number
//   withdraw: number
//   total: number
// }

// export function useSummary() {
//   const transactions = useContextSelector(TransactionsContext, (context) => {
//     return context.transactions
//   })
//   const [summary, setSummary] = useState<Summary[]>([])

//   const summaryData = useMemo(async () => {
//     const { data } = await api.get('/transactions/summary')

//     const summary = data.summary.map((t: Summary) => {
//       return {
//         deposit: t.deposit,
//         withdraw: t.withdraw,
//         total: t.total
//       }
//     })
//     return setSummary(summary)

//   }, [transactions])

//   return summaryData
// }
