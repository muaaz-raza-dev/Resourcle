// routes/userRoutes.ts
import { FastifyInstance } from 'fastify';
import { GetResourceUrls } from '../contollers/resource.controller';

interface UserResponse {
  message: string;
}

export default async function ResourceRoutes(fastify: FastifyInstance) {
  fastify.get<{Reply: UserResponse;Body:{link:string}}>('/urls',GetResourceUrls)
}
  

