import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { makeRegisterUseCase } from '@/factories/make-register-use-case'

export const register: FastifyPluginAsyncZod = async app => {
  app.post(
    '/profissional',
    {
      schema: {
        tags: ['Professional'],
        body: z.object({
          nome_profissional: z.string(),
          data_nascimento: z.string().datetime(),
          cpf: z.string().max(11),
          crp: z.string().max(20),
          logradouro: z.string(),
          bairro: z.string(),
          numero: z.string(),
          complemento: z.string().optional(),
          cep: z.string().max(10),
          cidade: z.string(),
          uf: z.string().max(2),
          telefone: z.string(),
          email: z.string().email(),
          senha: z.string(),
          is_social: z.boolean(),
        }),
      },
    },
    async (request, response) => {
      // desestruturação requisição
      const {
        nome_profissional,
        data_nascimento,
        cpf,
        crp,
        logradouro,
        bairro,
        numero,
        complemento,
        cep,
        cidade,
        uf,
        telefone,
        senha,
        email,
        is_social,
      } = request.body

      const registerUseCase = makeRegisterUseCase()

      try {
        registerUseCase.execute({
          nome_profissional,
          data_nascimento,
          cpf,
          crp,
          logradouro,
          bairro,
          numero,
          complemento,
          cep,
          cidade,
          uf,
          telefone,
          senha,
          email,
          is_social,
        })
      } catch (err) {
        console.log('O cadastro não foi realizado perante algum erro!')
      }

      return response
        .status(200)
        .send({ message: 'Profissional cadastrado com sucesso' })
    }
  )
}
