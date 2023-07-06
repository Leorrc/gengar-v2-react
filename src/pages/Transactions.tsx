import { Header } from '../components/Header'
import { Summary } from '../components/Summary'
import { Table } from '../components/Table'

export function Transactions() {
  return (
    <main className="bg-shape w-full h-screen mx-auto items-center">
      <Header />
      <Summary />
      <Table />
    </main>

  )
}

// bg-[#7C3AED]