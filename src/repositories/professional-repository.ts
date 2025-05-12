import type { Prisma, Profissional } from 'generated/prisma'

export interface ProfessionalRepository {
  findByEmail(email: string): Promise<Profissional | null>
  create(data: Prisma.ProfissionalCreateInput): Promise<Profissional>
}
