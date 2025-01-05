import Fastify from 'fastify';
import { dbConnection } from './db';
import {config} from "dotenv"
import loginRoutes from './routes/login.routes';
import TrackRoutes from './routes/track.routes';
import cors, { FastifyCorsOptions } from '@fastify/cors'
config();
const fastify = Fastify();
const corsOptions:FastifyCorsOptions = {
  origin: ["https://resourcle.vercel.app","http://localhost:3000"], 
  credentials: true, // Allow cookies to be sent with requests (if needed)
};


fastify.register(cors,corsOptions );
fastify.register(loginRoutes , { prefix: '/api/auth' });
fastify.register(TrackRoutes , { prefix: '/api/activity' });
// Run the server
const start = async () => {
  try {
    await dbConnection()
    await fastify.listen({ port: 6969, host: '0.0.0.0' });
    console.log('Server listening at http://localhost:6969');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
