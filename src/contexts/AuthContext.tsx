import { ReactNode, createContext, useCallback, useEffect, useState } from 'react'
import { destroyCookie, parseCookies, setCookie } from 'nookies'
import { api } from '../services/api'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

type User = {
  name: string
  token?: string
  refreshToken?: string
}

type SignUpCredentials = {
  name: string
  email: string
  password: string
}

type SignInCredentials = {
  email: string
  password: string
}

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

type SignInInput = Omit<SignInCredentials, 'id' | 'created_At'>

type AuthContextData = {
  logout: () => void
  isAuthenticated: boolean
  signIn(credentials: SignInInput): Promise<void>
  signUp(credentials: SignInInput): Promise<void>
  user: User | undefined
  transactions: Transaction[]
  fetchTransactions: (searchValue?: string, filter?: string) => Promise<void | Error>
  createTransaction: (data: CreateTransactionInput) => Promise<void>
  deleteTransaction: (id: string) => Promise<void | Error>
  summary: Summary[]
}

interface AuthContextProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<User | undefined>(undefined)
  const isAuthenticated = !!user
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [summary, setSummary] = useState<Summary[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    const { token } = parseCookies()

    if (token) {
      api.get('/me').then(response => {
        const { name } = response.data.user
        setUser({ name })
      })

    }
  }, [])

  async function signUp({ name, email, password }: SignUpCredentials) {
    try {
      await api.post('/users', { name, email, password })

      toast.success('Conta criada com sucesso!')

      await new Promise(resolve => setTimeout(resolve, 3000))
      navigate('/')
    } catch (err) {
      if (err) {
        toast.error('Este usuário já existe!')
        await new Promise(resolve => setTimeout(resolve, 3000))
        location.reload()
      }
    }
  }

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post('/session', {
        email,
        password,
      })

      console.log(response.data)
      const { token, refreshToken, name } = response.data

      setCookie(undefined, 'token', token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/'
      })
      setCookie(undefined, 'refreshToken', refreshToken, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/'
      })
      setUser({
        name,
        token,
        refreshToken
      })

      api.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${token}`

      toast.success('Login efetuado com sucesso.')

      await new Promise(resolve => setTimeout(resolve, 2000))
      navigate('/transactions')
      location.reload()

    } catch (err) {
      if (err) {
        toast.error('Este usuário não existe ou credenciais incorretas!')
        await new Promise(resolve => setTimeout(resolve, 3000))
        location.reload()
      }
    }
  }

  const handleLogout = useCallback(() => {
    destroyCookie(undefined, 'token')
    destroyCookie(undefined, 'refreshToken')

    navigate('/')
    location.reload()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
        toast.info('Transação excluída.', {
          position: 'bottom-right'
        })
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
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      signUp,
      signIn,
      logout: handleLogout,
      createTransaction,
      deleteTransaction,
      fetchTransactions,
      summary,
      transactions
    }}>
      {children}
    </AuthContext.Provider>
  )
}