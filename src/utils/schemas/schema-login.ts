import { z } from "zod"

export const claimUserFormSchemaLogin = z.object({
  email: z.string().email()
    .transform((email) => email.toLocaleLowerCase()),
  password: z.string()
    .nonempty('Digite a sua senha')
    .regex(/^\d+$/, { message: 'Senha somente números!' })
    .min(6, { message: 'A senha precisa ter pelo menos 6 números.' })
})