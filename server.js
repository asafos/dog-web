import fastifyInit from 'fastify';
import {serverPort} from './src/constants/appData';

const fastify = fastifyInit({logger: true});
  
  // Declare a route
  fastify.get('/', (request, reply) => {
    reply.send({ hello: 'world' })
  })
  
  // Run the server!
  fastify.listen(serverPort, (err, address) => {
    if (err) throw err
    fastify.log.info(`server listening on ${address}`)
  })