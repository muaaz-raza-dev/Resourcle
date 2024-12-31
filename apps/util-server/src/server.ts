import Fastify from 'fastify';
import utilsRoutes from './routes/util.routes.js';
import cors, { FastifyCorsOptions } from '@fastify/cors'; 
const fastify = Fastify();
const corsOptions: FastifyCorsOptions = {
  origin: ["https://resourcle.vercel.app","http://localhost:3000"], // Allows all origins. You can specify an array or function for specific origins
  credentials: true, // Allow cookies to be sent with requests (if needed)
  maxAge: 86400 // Cache preflight request results for 24 hours
};
fastify.register(cors, corsOptions);

// Declare a route
fastify.get('/', async (request, reply) => {
  return { hello: 'world' };
});

fastify.register(utilsRoutes , { prefix: '/api/utils' });
// Run the server
const start = async () => {
  try {
    await fastify.listen({ port: 4000, host: '0.0.0.0' });
    console.log('Util Server listening at http://localhost:4000');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
