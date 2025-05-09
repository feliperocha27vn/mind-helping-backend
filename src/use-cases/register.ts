import type { ProfessionalRepository } from '@/repositories/professional-repository'
import { hash } from 'bcryptjs'
import { randomUUID } from 'node:crypto'
import type { Profissional } from 'generated/prisma'

interface RegisterUseCaseRequest {
  nome_profissional: string
  data_nascimento: Date | string
  cpf: string
  crp: string
  logradouro: string
  bairro: string
  numero: string
  complemento?: string
  cep: string
  cidade: string
  uf: string
  telefone: string
  email: string
  senha: string
  is_social: boolean
}

interface RegisterCaseResponse {
  professional: Profissional
}

export class RegisterUseCase {
  constructor(private professionalRepository: ProfessionalRepository) {}

  async execute({
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
    email,
    senha,
    is_social,
  }: RegisterUseCaseRequest): Promise<RegisterCaseResponse> {
    const senha_hash = await hash(senha, 10)

    const professional = await this.professionalRepository.create({
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
      email,
      senha_hash,
      is_social,
    })

    return {
      professional,
    }
  }
}
