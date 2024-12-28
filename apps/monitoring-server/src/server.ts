import Fastify from 'fastify';
import { PushToQueue } from './send';

const fastify = Fastify();

// Declare a route
fastify.get('/', async (request, reply) => {
  PushToQueue() 
  return { hello: 'world' };

});
fastify.get('/messages', async (request, reply) => {
  PushToQueue() 
  return { messages: 'recieved' };

});

// Run the server
const start = async () => {
  try {
    await fastify.listen({ port: 4000, host: '0.0.0.0' });
    console.log('Server listening at http://localhost:4000');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
