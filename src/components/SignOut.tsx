import * as AlertDialog from '@radix-ui/react-alert-dialog'
import { useContext } from 'react'
import { FiLogOut } from 'react-icons/fi'
import { HiExclamationCircle } from "react-icons/hi2"
import { AuthContext } from '../contexts/AuthContext'
import { X } from 'phosphor-react'

export function SignOut() {
  const { logout } = useContext(AuthContext)

  async function handleLogout() {
    logout()
  }
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <button
          className="text-base text-white flex 
          justify-center items-center gap-2 bg-red absolute
          right-5 top-5  p-2  py-0 px-5 rounded h-12 transition-all hover:bg-green/90">
          <FiLogOut className="text-white text-lg" />
          Logout
        </button>


      </AlertDialog.Trigger>

      <AlertDialog.Portal>
        <AlertDialog.Overlay className="bg-[#000000f8] data-[state=open]:animate-overlayShow fixed inset-0" />
        <AlertDialog.Content className="
        
        data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-[#202024] p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">

          <AlertDialog.Title className="text-6xl text-red9 items-center justify-center flex">
            <HiExclamationCircle />
          </AlertDialog.Title>

          <AlertDialog.Cancel asChild className='absolute bg-transparent border-0 top-6 right-6 cursor-pointer text-white leading-[0] '>
            <X size={26} />
          </AlertDialog.Cancel>

          <AlertDialog.Description className="text-white mt-4 mb-5  text-center">
            Realmente desejar sair da sua conta ?
          </AlertDialog.Description>

          <div className="flex justify-center gap-[25px] mt-8">
            <AlertDialog.Cancel asChild>
              <button className="mt-3 inline-flex w-full justify-center rounded-md text-red11 bg-red4 hover:bg-red5 focus:shadow-red7 px-3 py-2 text-sm font-semibold  shadow-sm ring-1 ring-inset ring-gray-300 sm:mt-0 sm:w-auto border hover:border-red ">
                Cancelar
              </button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <button
                onClick={handleLogout}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto border hover:border-green ">
                Sim, Quero sair!
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  )
}

