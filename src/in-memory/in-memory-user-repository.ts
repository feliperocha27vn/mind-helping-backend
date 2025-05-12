import type { ProfessionalRepository } from '@/repositories/professional-repository'
import { randomUUID } from 'node:crypto'
import type { Prisma, Profissional } from 'generated/prisma'

export class InMemoryUserRespository implements ProfessionalRepository {
  public items: Profissional[] = []

  async findByEmail(email: string) {
    const professional = this.items.find(item => item.email === email)

    if (!professional) {
      return null
    }

    return professional
  }

  async create(data: Prisma.ProfissionalCreateInput) {
    const professional = {
      id_profissional: randomUUID(),
      nome_profissional: data.nome_profissional ?? null,
      data_nascimento: data.data_nascimento
        ? new Date(data.data_nascimento)
        : null,
      cpf: data.cpf ?? null,
      crp: data.crp ?? null,
      logradouro: data.logradouro ?? null,
      bairro: data.bairro ?? null,
      numero: data.numero ?? null,
      complemento: data.complemento ?? null,
      cep: data.cep ?? null,
      cidade: data.cidade ?? null,
      uf: data.uf ?? null,
      telefone: data.telefone ?? null,
      email: data.email ?? null,
      senha_hash: data.senha_hash,
      is_social: data.is_social ?? null,
    }

    this.items.push(professional)

    return professional
  }
}
