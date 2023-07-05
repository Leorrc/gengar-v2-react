import { RiDeleteBin6Line } from 'react-icons/ri'
import { dateFormatter, priceFormatter } from '../utils/formatter'
import { SearchForm } from './utils/SearchForm'
import Skeleton from './utils/skeleton'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'

type Transaction = {
  id: string
  title: string
  amount: number
  type: string
  category: string
  createdAt: Date
}

export function Table() {
  const [isLoading, setIsLoading] = useState(false)
  const { transactions, deleteTransaction } = useContext(AuthContext)

  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }, [])

  async function deleteTransa(id: string) {
    await deleteTransaction(id)
  }

  return (
    <div className="mt-8 max-w-[1120px] mx-auto min-h-[566px]">
      <SearchForm />
      {isLoading ?
        (<Skeleton />)
        : (
          <table className="w-full  border-separate border-spacing-x-0 border-spacing-y-2">
            <thead className="">
              <tr>
                <th className="text-textBody font-normal py-4 px-8 text-left leading-6">
                  Título
                </th>
                <th className="text-textBody font-normal py-4 px-8 text-left leading-6">
                  Valor
                </th>
                <th className="text-textBody font-normal py-4 px-8 text-left leading-6">
                  Categoria
                </th>
                <th className="text-textBody font-normal py-4 px-8 text-left leading-6">
                  Data
                </th>
              </tr>
            </thead>
            <tbody >
              {transactions.map((t: Transaction, index) => {
                return (
                  <tr key={index} className='bg-shape2'>
                    <td className="py-4 px-8 rounded-l-lg text-textBody">
                      {t.title}
                    </td>
                    <td
                      className={`py-4 px-8 text-green ${t.type === 'deposit' ? 'type1' : ''
                        } ${t.type === 'withdraw' ? 'type2' : ''} `}
                    >
                      {priceFormatter.format(t.amount)}
                    </td>
                    <td className="py-4 px-8 text-textBody">
                      {t.category}
                    </td>
                    <td className="py-4 px-8  text-textBody">
                      {dateFormatter.format(t.createdAt)}
                    </td>
                    <td className=" rounded-r-lg text-textBody items-center justify-center content-center">
                      <RiDeleteBin6Line
                        className="text-red text-xl cursor-pointer"
                        type="button"
                        onClick={() => {
                          deleteTransa(t.id)
                        }}
                      />
                    </td>
                  </tr>
                )
              }
              )}
            </tbody>
          </table>
        )}



    </div >
  )
}