import 'fastify';
declare module 'fastify' {
    interface FastifyRequest {
        userid?: string; // Add userid property (optional or required based on your needs)
    }
  }