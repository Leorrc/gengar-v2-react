import logo from '../assets/logo2.svg'
import * as Dialog from '@radix-ui/react-dialog'
import { NewTransactionModal } from './NewTransactionModal'
import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { SignOut } from './SignOut'


export function Header() {
  const { user } = useContext(AuthContext)

  return (
    <header className="bg-[#202024] ">
      <SignOut />

      <div className="flex items-center justify-between max-w-[1120px] my-0 mx-auto pt-8 py-[203.29px] w-auto h-auto">
        <div className='flex gap-2'>
          <strong className="font-semibold text-xl text-gray-100">
            Usuário :
          </strong>
          <h2 className="text-green font-bold text-xl capitalize animate-pulse">
            {user?.name}
          </h2>
        </div>
        <img src={logo} alt="logo"
        />

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <button
              type="button"
              className="text-base text-white bg-green py-0 px-5 rounded h-12 transition-all hover:bg-green/90">
              Nova transação
            </button>
          </Dialog.Trigger>
          <NewTransactionModal />
        </Dialog.Root>

      </div>
    </header>
  )
}