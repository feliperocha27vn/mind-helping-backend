import { InMemoryUserRespository } from '@/in-memory/in-memory-user-repository'
import { RegisterUseCase } from '@/use-cases/register'
import { compare } from 'bcryptjs'
import { beforeEach } from 'vitest'
import { it, describe, expect } from 'vitest'

let professionalRepository: InMemoryUserRespository
let sut: RegisterUseCase

describe('Register use case', () => {
  beforeEach(() => {
    professionalRepository = new InMemoryUserRespository()
    sut = new RegisterUseCase(professionalRepository)
  })

  it('deve fazer o hash da senha do usuário', async () => {
    const { professional } = await sut.execute({
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
