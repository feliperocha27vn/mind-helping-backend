import { InMemoryUserRespository } from '@/in-memory/in-memory-user-repository'
import { RegisterUseCase } from '@/use-cases/register'
import { compare } from 'bcryptjs'
import { it, describe, expect } from 'vitest'

describe('Register use case', () => {
  it('deve fazer o hash da senha do usuário', async () => {
    const professionalRepository = new InMemoryUserRespository()
    const registerUseCase = new RegisterUseCase(professionalRepository)

    const { professional } = await registerUseCase.execute({
      nome_profissional: 'Ana Silva',
      data_nascimento: new Date('1985-07-15T00:00:00.000Z'),
      cpf: '12345678901',
      crp: '12345/SP',
      logradouro: 'Rua das Flores',
      bairro: 'Jardim Primavera',
      numero: '123',
      complemento: 'Apto 45',
      cep: '12345-678',
      cidade: 'São Paulo',
      uf: 'SP',
      telefone: '(11) 91234-5678',
      email: 'ana.silva@example.com',
      senha: '123456',
      is_social: false,
    })

    const isPasswordHashed = await compare('123456', professional.senha_hash)

    expect(isPasswordHashed).toBe(true)
  })
})
