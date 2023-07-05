import { CurrencyDollar } from "phosphor-react"
import { FiArrowDownCircle, FiArrowUpCircle } from "react-icons/fi"
import { priceFormatter } from "../utils/formatter"
import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"

export interface Summary {
  deposit: number
  withdraw: number
  total: number
}

export function Summary() {
  const { summary } = useContext(AuthContext)

  return (
    <>
      {summary.map((s: Summary, index) => {
        return (
          <section key={index} className="grid grid-cols-3 gap-8 -mt-28 max-w-[1120px] mx-auto">
            <div className="bg-[#323238] py-6 px-8 rounded ">
              <header className="flex items-center justify-between">
                <span className="text-titles">Entradas</span>
                <FiArrowUpCircle className="text-green text-2xl" />
              </header>
              <strong className="block mt-4 font-medium text-4xl text-white">
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(s.deposit)}
              </strong>
            </div>

            <div className="bg-shape2 py-6 px-8 rounded">
              <header className="flex items-center justify-between">
                <span className="text-titles">Saídas</span>
                <FiArrowDownCircle className="text-red text-2xl" />

              </header>
              <strong className="block mt-4 font-medium text-4xl text-white">
                - {priceFormatter.format(s.withdraw)}
              </strong>
            </div>

            <div
              className={` py-6 px-8 rounded text-white active1`}>
              <header className="flex items-center justify-between">
                <span className="text-titles">Total</span>
                <CurrencyDollar size={32} color="#fff" />
              </header>
              <strong className="block mt-4 font-medium text-4xl ">
                {priceFormatter.format(s.total)}
              </strong>
            </div>

          </section >
        )
      })}
    </>
  )
}




