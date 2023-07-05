import { zodResolver } from "@hookform/resolvers/zod"
import { MagnifyingGlass } from "phosphor-react"
import { useForm } from "react-hook-form"
import { TransactionsContext } from "../../contexts/TransactionsContext"
import { useContextSelector } from "use-context-selector"
import * as z from 'zod'
import { useContext } from "react"
import { AuthContext } from "../../contexts/AuthContext"

const searchFormSchema = z.object({
  searchValue: z.string().transform((searchValue) => searchValue.toLocaleLowerCase())
})

type SearchFormInputs = z.infer<typeof searchFormSchema>

export function SearchForm() {
  const { fetchTransactions } = useContext(AuthContext)

  const {
    register,
    handleSubmit,
    formState: {
      isSubmitting
    }
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema)
  })

  async function handleSearchTransactions(data: SearchFormInputs) {
    console.log(data)

    await fetchTransactions(data.searchValue)
  }


  return (
    <form onSubmit={handleSubmit(handleSearchTransactions)} className="flex gap-4">
      <input
        className="flex-[1] rounded-md border-0 bg-gray-900 text-gray-200 p-4 placeholder:text-gray-500"
        type="text"
        placeholder="Busque por transações"
        {...register('searchValue')}
      />

      <button
        className={` border text-green border-green rounded flex justify-center items-center gap-2 px-4 py-0 box-border transition-all group-hover:not:disabled:bg-green hover:(not:disabled:text-gray-100) disabled:opacity-60 disabled:cursor-wait`}
        type="submit"
        disabled={isSubmitting}
      >
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </form>
  )
}
