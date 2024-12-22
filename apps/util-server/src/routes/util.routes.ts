// routes/userRoutes.ts
import { FastifyInstance } from 'fastify';
import { LinkValidator } from '../contollers/link-validator';

interface UserResponse {
  message: string;
}

export default async function utilsRoutes(fastify: FastifyInstance) {
  fastify.post<{Reply: UserResponse;Body:{link:string}}>('/validate/link',LinkValidator)
}
  

