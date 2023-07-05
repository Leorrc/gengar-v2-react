import img from '../assets/2.png'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContext, useEffect, useState } from 'react'
import { Loading } from '../components/utils/Loading'
import { claimUserFormSchema } from '../utils/schemas/schemas'
import { AuthContext } from '../contexts/AuthContext'
import { Spinner } from '../components/utils/Spinner'

type ClainUserFormData = z.infer<typeof claimUserFormSchema>

export function SignUp() {
  const { signUp } = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [])

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ClainUserFormData>({
    resolver: zodResolver(claimUserFormSchema)
  })

  const handleSignUp: SubmitHandler<ClainUserFormData> = async (values) => {
    try {
      await signUp(values)
    } catch (err) {
      if (err) {
        return
      }
    }
  }


  return (
    <>
      {isLoading ? (<Loading />) : (<section className="bg-shape2 flex items-center justify-center h-screen w-screen p-4">
        <motion.div
          initial={{ x: '13%' }}
          animate={{ x: '0' }}
          className="HeaderColor  w-[50%] h-full py-10 px-0 rounded"></motion.div>

        <motion.div
          initial={{ x: '-13%' }}
          animate={{ x: '0' }}
          className="w-[50%] max-h-[56.25rem] py-10 px-0 md:p-12">
          <header className="flex flex-col items-center">
            <img
              className="animate-[gengar_2s_ease-in-out_infinite] drop-shadow-[0_0_1rem_rgb(36,15,70)] mx-auto w-auto h-auto"
              src={img}
              alt="gengar"
            />

            <header className="mt-4 text-lg text-gray-100">
              Crie uma nova conta
            </header>

            <h2 className="text-gray-400 mt-1">Faça seu cadastro!</h2>
          </header>

          <form className="flex flex-col mt-10 my-0 mx-auto max-w-sm w-full gap-4" onSubmit={handleSubmit(handleSignUp)}>
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-gray-100 ">Seu nome</label>

              <input
                className="flex items-center gap-3 h-12 py-4 px-3 rounded bg-gray-800 w-full focus-within:ring-2 ring-cyan-300 text-gray-100"
                {...register('name')}
                name='name'
                type="text"
                placeholder="Digite seu nome"
              />
              {errors.name && (<span className='text-red font-medium font-sans'> {errors.name ? errors.name.message : 'Digite o nome do usuário'} </span>)}
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-gray-100 ">Seu e-mail</label>

              <input
                className="flex items-center gap-3 h-12 py-4 px-3 rounded bg-gray-800 w-full focus-within:ring-2 ring-cyan-300 text-gray-100"
                {...register('email')}
                name='email'
                type="email"
                placeholder="Digite seu e-mail"
              />
              {errors.email && (<span className='text-red font-medium font-sans'> {errors.email ? errors.email.message : 'Digite o nome do usuário'} </span>)}
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-semibold text-gray-100 ">Sua senha</label>

              <input
                className="flex items-center gap-3 h-12 py-4 px-3 rounded bg-gray-800 w-full focus-within:ring-2 ring-cyan-300 text-gray-100"
                {...register('password')}
                name='password'
                type="password"
                placeholder="Digite sua senha"
              />
              {errors.password && (<span className='text-red font-medium font-sans'> {errors.password?.message} </span>)}
            </div>

            {isSubmitting ? (
              <Spinner />
            ) : (
              <div className="mt-4 flex flex-col gap-4 ">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="justify-center items-center text-center text-white py-3 px-4 bg-roxo rounded font-semibold text-sm  transition-colors hover:bg-roxo2 focus:ring-2 ring-white">
                  Cadastrar
                </button>
              </div>
            )}
            <div className="pt-8">
              <p className="font-normal text-sm text-gray-100 ">
                Já possui uma conta?{' '}
                <Link to="/"

                  className="text-roxo2 font-bold hover:underline transition-all">
                  {' '}
                  Clique aqui
                </Link>
              </p>
            </div>
          </form>
        </motion.div>
      </section>)}
    </>
  )
}

// const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
//   e.preventDefault()

//   navigate('/dashboard')
//   window.location.href = window.location.href
// }

// const handleLogin = useCallback(
//   async (e: FormEvent<HTMLFormElement>, email: string) => {
//     e.preventDefault()
//     const result = await api.get(`/expenses/${email}`)
//     if (result === result) {
//       navigate('/dashboard')
//       window.location.href = window.location.href
//     } else {
//     }
//   },
//   [],
// )

// <form
// // onSubmit={handleSubmit(signup)}
// className="flex flex-col mt-10 my-0 mx-auto max-w-sm w-full gap-4">
// <div className="flex flex-col gap-2">
//   <label htmlFor="" className="font-semibold text-gray-100 ">
//     Seu e-mail
//   </label>
//   <div onError={() => Boolean(errors.email?.message)}>
//     <input
//       className="flex items-center gap-3 h-12 py-4 px-3 rounded bg-gray-800 w-full focus-within:ring-2 ring-cyan-300 text-gray-100"
//       type="email"
//       placeholder="Digite seu e-mail"
//       {...register('email')}
//     />
//     {errors.email?.message && (
//       <span className=" text-red font-medium">
//         {errors.email?.message}
//       </span>
//     )}{' '}
//   </div>
// </div>

// <div className="mt-4 flex flex-col gap-4 ">
//   <button
//     // type="submit"
//     // onChange={e => handleLogin}
//     // onClick={() => handleLogin}
//     className="justify-center items-center text-base text-center text-white py-3 px-4 bg-roxo rounded font-semibold text-sm  transition-colors hover:bg-roxo2 focus:ring-2 ring-white">
//     Cadastrar
//   </button>
// </div>
// <div className="pt-8">
//   <p className="font-normal text-sm text-gray-100 ">
//     Já possui uma conta?{' '}
//     <Link
//       to="/signin"
//       className="text-roxo2 font-bold hover:underline transition-all">
//       {' '}
//       Clique aqui
//     </Link>
//   </p>
// </div>
// </form>
