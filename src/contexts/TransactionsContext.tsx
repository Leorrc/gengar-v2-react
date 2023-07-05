import { ReactNode, useEffect, useState, useCallback } from 'react'
import { createContext } from 'use-context-selector'
import { api } from '../services/api'

interface Transaction {
  id: string
  title: string
  amount: number
  category: string
  type: string
  createdAt: Date
  userId: string
}

interface CreateTransactionInput {
  title: string
  amount: number
  category: string
  type: 'deposit' | 'withdraw'
}

interface Summary {
  deposit: number
  withdraw: number
  total: number
}

interface TransactionContextType {
  transactions: Transaction[]
  fetchTransactions: (searchValue?: string, filter?: string) => Promise<void | Error>
  createTransaction: (data: CreateTransactionInput) => Promise<void>
  deleteTransaction: (id: string) => Promise<void | Error>
  summary: Summary[]
}

interface TransactionsProviderProps {
  children: ReactNode
}

export const TransactionsContext = createContext({} as TransactionContextType)

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [summary, setSummary] = useState<Summary[]>([])

  const fetchTransactions = useCallback(
    async (searchValue?: string, filter?: string) => {
      try {
        const response = await api.get('/transactions/get-all-user-transaction/', {
          params: {
            searchValue: searchValue,
            filter: filter
          }
        })

        setTransactions(response.data)

        if (!Error) {
          return setTransactions(response.data)
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        // toast.error('Nenhum resultado encontrado.')
        // toast.info('Pesquise um título existente!', {
        //   position: toast.POSITION.TOP_CENTER
        // })
        return new Error(error.response.data.message || 'Nenhum resultado encontrado.')
      }
    }, [])

  const createTransaction = useCallback(
    async (data: CreateTransactionInput) => {
      const { title, amount, category, type } = data

      const response = await api.post(`/transactions/`, {
        title,
        amount,
        category,
        type
      })

      fetchTransactions()
      setTransactions(state => [response.data, ...state])
    },
    [fetchTransactions]
  )

  const deleteTransaction = async (id: string): Promise<undefined | Error> => {
    try {
      if (window.confirm(`Realmente você quer excluir este item?`)) {
        await api.delete(`/transactions/delete/${id}`)
        setTransactions(transactions.filter(deletedId => deletedId.id !== id))
      }
      return undefined
    } catch (error) {
      return
    }
  }

  async function loadSummary() {
    const { data } = await api.get(`transactions/summary`)

    const summary = data.summary.map((t: Summary) => {
      return {
        deposit: t.deposit,
        withdraw: t.withdraw,
        total: t.total
      }
    })
    return setSummary(summary)
  }

  useEffect(() => {
    loadSummary()
  }, [transactions])

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  return (
    <TransactionsContext.Provider value={{ createTransaction, transactions, fetchTransactions, summary, deleteTransaction }}>
      {children}
    </TransactionsContext.Provider>
  )
}
