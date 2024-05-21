import { Link } from "react-router-dom"
import { SubmitHandler, useForm } from 'react-hook-form'
import { motion } from "framer-motion"
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import img from '../assets/2.png'
import { useContext, useEffect, useState } from "react"
import { Loading } from "../components/utils/Loading"
import { AuthContext } from "../contexts/AuthContext"
import { claimUserFormSchemaLogin } from "../utils/schemas/schema-login"
import { Spinner } from "../components/utils/Spinner"

type ClainUserFormData = z.infer<typeof claimUserFormSchemaLogin>

export function SignIn() {
  const { signIn } = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [])

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ClainUserFormData>({
    resolver: zodResolver(claimUserFormSchemaLogin)
  })

  const handleSignIn: SubmitHandler<ClainUserFormData> = async (values) => {
    await signIn(values)
  }

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <section className="bg-shape2 flex items-center justify-center h-screen w-screen p-4">
          <motion.div
            initial={{ x: '13%' }}
            animate={{ x: '0' }}
            className="lg:w-[50%] max-h-[56.25rem] py-10 px-0 md:p-12">
            <header className="flex flex-col items-center">
              <img
                className="animate-[gengar_2s_ease-in-out_infinite] drop-shadow-[0_0_1rem_rgb(36,15,70)] mx-auto w-auto h-auto"
                src={img}
                alt="gengar"
              />

              <header className="mt-4 text-lg text-gray-100">
                Gengar Control Money
              </header>

              <h2 className="text-gray-400 mt-1">Faça login e comece a usar!</h2>
            </header>

            <form className="flex flex-col mt-10 my-0 mx-auto max-w-sm w-full gap-4" onSubmit={handleSubmit(handleSignIn)}>
              <div className="flex flex-col gap-2">
                <label className="font-semibold text-gray-100 ">Seu e-mail</label>

                <input
                  className="flex items-center gap-3 h-12 py-4 px-3 rounded bg-gray-800 w-full focus-within:ring-2 ring-cyan-300 text-gray-100"
                  {...register('email')}
                  name='email'
                  type="email"
                  placeholder="Digite o seu e-mail"
                />
                {errors.email && (<span className='text-red font-medium font-sans'> {errors.email ? errors.email.message : 'Digite o seu e-mail'} </span>)}
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

              {/* <div className="mt-4 flex flex-col gap-4 ">
                <button
                  type="submit"
                  className="justify-center items-center text-center text-white py-3 px-4 bg-roxo rounded font-semibold text-sm  transition-colors hover:bg-roxo2 focus:ring-2 ring-white">
                  Entrar
                </button>
              </div> */}

              {isSubmitting ? (
                <Spinner />
              ) : (
                <div className="mt-4 flex flex-col gap-4 ">
                  <button
                    type="submit"
                    className="justify-center items-center text-center text-white py-3 px-4 bg-roxo rounded font-semibold text-sm  transition-colors hover:bg-roxo2 focus:ring-2 ring-white">
                    Entrar
                  </button>
                </div>
              )}

              <div className="pt-8">
                <p className="font-normal text-sm text-gray-100 ">
                  Ainda não tem uma conta?{' '}
                  <Link to="/register"

                    className="text-roxo2 font-bold hover:underline transition-all">
                    {' '}
                    Inscreva-se
                  </Link>
                </p>
              </div>
            </form>

          </motion.div>
          <motion.div
            initial={{ x: '-13%' }}
            animate={{ x: '0' }}
            className="HeaderColor lg:w-[50%] lg:h-full py-10 px-0 rounded"
          />
        </section>
      )}
    </>
  )
}