import Fastify from 'fastify';
import { config } from 'dotenv';
import utilsRoutes from './routes/util.routes.js';
import cors, { FastifyCorsOptions } from '@fastify/cors'

import { dbConnection } from './db.js';
import ResourceRoutes from './routes/resource.routes.js';
config();
const fastify = Fastify();
const corsOptions:FastifyCorsOptions = {
  origin: ["https://resourcle.com","http://localhost:3000"], 
  credentials: true, // Allow cookies to be sent with requests (if needed)
};
fastify.register(cors,corsOptions );

// Declare a route
fastify.get('/', async (request, reply) => {
  return { message: 'Hello world all the way from the Mars' };
});

fastify.register(utilsRoutes , { prefix: '/api/utils' });
fastify.register(ResourceRoutes , { prefix: '/api/resource' });

// Run the server
const port = +(process.env.PORT||4000) || 4000
const start = async () => {
  try {
    await dbConnection();
    await fastify.listen({ port,host:"0.0.0.0"});
    console.log('Util Server listening at http://localhost:4000');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
