import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'
import * as Dialog from '@radix-ui/react-dialog'
import * as RadioGroup from '@radix-ui/react-radio-group'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { AuthContext } from '../contexts/AuthContext'
import { useContext } from 'react'
import { toast } from 'react-toastify'

const newTransactionFormSchema = z.object({
  title: z.string().transform(title => title.toLowerCase()),
  amount: z.number(),
  category: z.string().transform(category => category.toLowerCase()),
  type: z.enum(['deposit', 'withdraw']),
})

type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>



export function NewTransactionModal() {
  const { createTransaction } = useContext(AuthContext)

  const {
    control,
    register,
    handleSubmit,
    formState: {
      isSubmitting
    },
    reset,
  } = useForm<NewTransactionFormInputs>({
    resolver: zodResolver(newTransactionFormSchema),
    defaultValues: {
      type: 'deposit'
    }
  })

  async function handleCreateTransaction(data: NewTransactionFormInputs) {
    const { title, amount, category, type } = data

    try {
      await createTransaction({
        title,
        amount,
        category,
        type
      })

      reset()
      toast.success('Transação cadastrada!')
    } catch (error) {
      return
    }
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className='fixed w-screen h-screen top-0 bottom-0 left-0 right-0 bg-[#00000085]' />

      <Dialog.Content className='fixed min-w-[32rem] rounded-md py-10 px-12 bg-[#202024] top-2/4 left-1/2 -translate-y-2/4 -translate-x-2/4'>
        <Dialog.Title className='text-white'>Nova transação</Dialog.Title>

        <Dialog.Close

          className='absolute bg-transparent border-0 top-6 right-6 cursor-pointer text-gray-500 leading-[0]'>
          <X size={24} />
        </Dialog.Close>

        <form
          onSubmit={handleSubmit(handleCreateTransaction)}

          className='flex flex-col mt-8 gap-4'
        >
          <input
            className='rounded-md border-0 bg-gray-900 text-gray-300 p-4 placeholder:text-gray-500'
            type="text"
            placeholder='Descrição'
            required
            {...register('title')}
          />
          <input
            className='rounded-md border-0 bg-gray-900 text-gray-300 p-4 placeholder:text-gray-500'
            type="number"
            placeholder='Preço'
            required
            {...register('amount', { valueAsNumber: true })}
          />
          <input
            className='rounded-md border-0 bg-gray-900 text-gray-300 p-4 placeholder:text-gray-500'
            type="text"
            placeholder='Categoria'
            required
            {...register('category')}
          />

          <Controller
            control={control}
            name="type"
            render={({ field }) => {
              return (
                <RadioGroup.Root onValueChange={field.onChange} value={field.value} className='grid grid-cols-2 gap-4 mt-2'>
                  <RadioGroup.Item
                    value='deposit'
                    className=
                    {`
                    flex items-center justify-center bg-shape2 p-4 border border-shape2 gap-2 rounded-md cursor-pointer text-gray-300 hover:border-green
                    data-[state=checked]:bg-green  data-[state=unchecked]:bg-shape2
                    `}>
                    <ArrowCircleUp size={24} className='text-white data-[state=checked]:text-white data-[state=unchecked]:' />
                    Entrada
                  </RadioGroup.Item>
                  <RadioGroup.Item
                    value='withdraw'
                    className={`bg-shape2 p-4 flex items-center justify-center gap-2
                     rounded-md cursor-pointer border border-shape2 text-gray-300 hover:border-red data-[state=checked]:bg-redLight `}>
                    <ArrowCircleDown size={24} className='text-white checked:text-white' />
                    Saída
                  </RadioGroup.Item>

                </RadioGroup.Root>
              )
            }}
          />

          <button type='submit'

            disabled={isSubmitting}
            className={`h-[58px] border-0 bg-green text-white font-bold py-0 px-5
             rounded-md mt-6 cursor-pointer hover:bg-greenDark transition-all `} >
            Cadastrar
          </button>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  )
}