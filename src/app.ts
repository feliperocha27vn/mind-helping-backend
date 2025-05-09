import fastify from 'fastify'
import type { FastifyTypeProvider } from 'fastify'

export const app = fastify().withTypeProvider<FastifyTypeProvider>()
