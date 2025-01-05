import { FastifyInstance } from 'fastify';
import { TrackUserProfileVisits, TrackUserResourceVisit, TrackUserVisits } from '../controllers/track.controller';

interface UserResponse {
  message: string;
  payload:any;
}

export default async function TrackRoutes(fastify: FastifyInstance) {
  fastify.get<{Reply: UserResponse; }>('/',TrackUserVisits);
  fastify.get<{Reply: UserResponse;Params:{userid:string} }>('/profile/:userid',TrackUserProfileVisits);
  fastify.get<{Reply: UserResponse;Params:{resourceid:string} }>('/resource/:resourceid',TrackUserResourceVisit);
}
  

