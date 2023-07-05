export type Transaction = {
  id?: string
  title: string
  amount: number
  category: string
  type: string
  createdAt: Date
  user_id?: string
}