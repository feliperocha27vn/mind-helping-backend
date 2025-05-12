import { InMemoryUserRespository } from '@/in-memory/in-memory-user-repository'
import { it, describe, expect, beforeEach } from 'vitest'
import { AuthenticationUseCase } from './authentication'
import { InvalidCredentials } from './errors/invalid-credentials'
import { hash } from 'bcryptjs'

let professionalRepository: InMemoryUserRespository
let sut: AuthenticationUseCase

describe('Authentication use case', () => {
  beforeEach(() => {
    professionalRepository = new InMemoryUserRespository()
    sut = new AuthenticationUseCase(professionalRepository)
  })

  it('deve validar login do usuário', async () => {
    await professionalRepository.create({
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
      senha_hash: await hash('12345', 6),
      is_social: false,
    })

    const { professional } = await sut.execute({
      email: 'ana.silva@example.com',
      senha: '12345',
    })

    expect(professional.id_profissional).toEqual(expect.any(String))
  })

  it('deve não ser possível se autenticar com email errado.', async () => {
    await expect(
      sut.execute({
        email: 'email-nãoexiste@example.com',
        senha: '12345',
      })
    ).rejects.toBeInstanceOf(InvalidCredentials)
  })

  it('deve não ser possível entrar com a senha errada.', async () => {
    await professionalRepository.create({
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
      senha_hash: await hash('12345', 6),
      is_social: false,
    })

    await expect(
      sut.execute({
        email: 'ana.silva@example.com',
        senha: '121212',
      })
    ).rejects.toBeInstanceOf(InvalidCredentials)
  })
})
