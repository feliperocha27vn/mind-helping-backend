import type { Prisma, Profissional } from 'generated/prisma'
import type { ProfessionalRepository } from '../professional-repository'
import { prisma } from 'lib/prisma'

export class PrismaProfessionalsRepository implements ProfessionalRepository {
  async findByEmail(email: string) {
    const user = await prisma.profissional.findUnique({
      where: {
        email,
      },
    })

    return user
  }

  async create(data: Prisma.ProfissionalCreateInput) {
    const professional = await prisma.profissional.create({
      data,
    })

    return professional
  }
}
