import { z } from "zod"

export const claimUserFormSchema = z.object({
  name: z.string().nonempty()
    .regex(/^([a-z\\-]+)$/i, { message: 'O usuário pode ter apenas letras e hifens.' })
    .min(3, { message: 'O nome precisa ter pelo menos 3 letras.' })
    .transform((name) => name.toLocaleLowerCase()),
  email: z.string().email()
    .transform((email) => email.toLocaleLowerCase()),
  password: z.string()
    .nonempty('Digite a sua senha')
    .regex(/^\d+$/, { message: 'Senha somente números!' })
    .min(6, { message: 'A senha precisa ter pelo menos 6 números.' })
})