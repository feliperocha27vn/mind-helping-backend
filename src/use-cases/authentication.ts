import type { ProfessionalRepository } from '@/repositories/professional-repository'
import { compare } from 'bcryptjs'
import type { Profissional } from 'generated/prisma'
import { InvalidCredentials } from './errors/invalid-credentials'

interface AuthenticationUseCaseRequest {
  email: string
  senha: string
}

interface AuthenticationUseCaseResponse {
  professional: Profissional
}

export class AuthenticationUseCase {
  constructor(private professionalRepository: ProfessionalRepository) {}

  async execute({
    email,
    senha,
  }: AuthenticationUseCaseRequest): Promise<AuthenticationUseCaseResponse> {
    const professional = await this.professionalRepository.findByEmail(email)

    if (!professional) {
      throw new InvalidCredentials()
    }

    const doesPasswordMatches = await compare(senha, professional.senha_hash)

    if (!doesPasswordMatches) {
      throw new InvalidCredentials()
    }

    return {
      professional,
    }
  }
}
