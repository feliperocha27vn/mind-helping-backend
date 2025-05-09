import type { Prisma } from 'generated/prisma'
import type { ProfessionalRepository } from '../professional-repository'
import { prisma } from 'lib/prisma'

export class PrismaProfessionalsRepository implements ProfessionalRepository {
  async create(data: Prisma.ProfissionalCreateInput) {
    const professional = await prisma.profissional.create({
      data,
    })

    return professional
  }
}
