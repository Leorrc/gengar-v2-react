import { FiArrowDownCircle, FiArrowUpCircle, FiLogOut } from 'react-icons/fi'
import logo from '../assets/2.png'
import { AuthContext } from '../contexts/AuthContext'
import { useContext, useEffect, useState } from 'react'
import { SignOut } from '../components/SignOut'
import { useForm } from 'react-hook-form'
import { api } from '../services/api'

type FilterFormInputs = {
  filter: string;
}

export function NavBar() {
  const { fetchTransactions } = useContext(AuthContext)
  const { user } = useContext(AuthContext)
  const { handleSubmit, setValue } = useForm<FilterFormInputs>()
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen)
    console.log(toggleNavbar)
  }

  useEffect(() => {
    api.get('/me')
      .then(response => console.log(response.data.user))
      .catch(err => console.log(err))
  }, [])

  async function onSubmit(data: FilterFormInputs) {
    console.log(data.filter);
    await fetchTransactions(data.filter)
  }

  const handleButtonClick = (filterValue: string) => {
    setValue('filter', filterValue)
  }

  return (
    <>
      {isOpen ? (
        <nav className="w-[276px] h-[1024px] fixed justify-center items-center bg-[#7C3AED]">

          <div onClick={() => toggleNavbar()} className="cursor-pointer flex flex-col text-center justify-center mt-16">
            <img
              className='mx-auto w-32 h-24 '
              src={logo}
              alt="logo" />

            <strong className="block mt-4 font-semibold text-xl text-gray-100">
              Usuário logado:
            </strong>
            <h2 className="text-green font-bold text-xl pb-4 capitalize">
              {user?.name}
            </h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <ul className="mt-32 grid gap-9 text-gray-100 text-center px-6 transition-all">
              <li className="flex  gap-4 cursor-pointer items-center">
                <FiArrowUpCircle className="text-green text-2xl" />
                <button
                  className="hover:text-white"
                  type="submit" onClick={() => handleButtonClick('')}
                >
                  Todas Transações
                </button>
              </li>
              <li className="flex  gap-4 cursor-pointer items-center">
                <FiArrowUpCircle className="text-green text-2xl" />
                <button
                  className="hover:text-white"
                  type="submit" onClick={() => handleButtonClick('deposit')}
                >
                  Entradas
                </button>
              </li>
              <li className="flex  gap-4 cursor-pointer items-center">
                <FiArrowDownCircle className="text-red text-2xl" />
                <button
                  className="hover:text-white"
                  type="submit" onClick={() => handleButtonClick('withdraw')}
                >
                  Saídas
                </button>
              </li>
            </ul>
            <footer className="bottom-0 absolute w-full">
              <div className="px-8 py-6 border-t border-HeaderColor flex justify-center items-center gap-4 ">
                <SignOut />
              </div>
            </footer>
          </form>

        </nav>
      )
        :
        (
          <nav
            onClick={() => toggleNavbar()}
            className=" bg-[#7C3AED]
            flex flex-col w-[138px] h-screen
            cursor-pointer fixed  items-center justify-between
            
            ">

            <div className="text-center justify-center ">
              <img
                className='mx-auto w-32 h-24 mt-16'
                src={logo}
                alt="logo" />
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}>
              <ul className=" grid gap-9 text-gray-100 text-center items-center justify-center transition-all">

                <li className="flex  gap-4 cursor-pointer items-center">
                  <FiArrowUpCircle className="text-green text-5xl" />
                </li>

                <li className="flex  gap-4 cursor-pointer items-center">
                  <FiArrowUpCircle className="text-green text-5xl" />
                </li>

                <li className="flex  gap-4 cursor-pointer items-center">
                  <FiArrowDownCircle className="text-red text-5xl" />
                </li>

              </ul>
            </form>

            <div
              className="text-base text-white flex justify-center items-center gap-4 bottom-0">
              <FiLogOut className="text-white text-4xl" />
            </div>

          </nav>
        )}
    </>
  )
}