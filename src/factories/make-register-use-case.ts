import { PrismaProfessionalsRepository } from '@/repositories/prisma/prisma-professionals-repository'
import { RegisterUseCase } from '@/use-cases/register'

export function makeRegisterUseCase() {
  const prismaProfessionalsRepository = new PrismaProfessionalsRepository()
  const registerUseCase = new RegisterUseCase(prismaProfessionalsRepository)

  return registerUseCase
}
