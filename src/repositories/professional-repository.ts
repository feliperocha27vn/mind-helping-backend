import type { Prisma, Profissional } from 'generated/prisma'

export interface ProfessionalRepository {
  create(data: Prisma.ProfissionalCreateInput): Promise<Profissional>
}
