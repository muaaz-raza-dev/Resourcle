import { FastifyInstance } from 'fastify';
import { LoginAdmin } from '../controllers/login.controller.js';

interface UserResponse {
  message: string;
  payload:any;
}

export default async function loginRoutes(fastify: FastifyInstance) {
  fastify.post<{Reply: UserResponse;Body: {password:string;name:string;code:string} }>('/login',LoginAdmin);
  
}
  

