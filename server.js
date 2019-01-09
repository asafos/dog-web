import fastifyInit from 'fastify';
import {serverPort} from './src/constants/appData';
import {PORT} from 'config';

const fastify = fastifyInit({logger: true});
  
  // Declare a route
  fastify.get('/api/data', (request, reply) => {
    reply.send({ hello: 'world' })
  })
  
  // Run the server!
  fastify.listen(PORT, (err, address) => {
    if (err) throw err
    fastify.log.info(`server listening on ${address}`)
  })