import fastifyInit from 'fastify';
import {serverPort} from './src/constants/appData';
import {PORT, mongo} from 'config';
import mongoose from 'mongoose';

// Connect to DB
mongoose.connect(`${mongo.host}/${mongo.db}`, {useNewUrlParser: true})
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

const fastify = fastifyInit({logger: true});

// Declare a route
fastify.get('/api/data', (request, reply) => {
    reply.send({hello: 'world'})
});

const start = async () => {
    try {
        await fastify.listen(PORT);
        fastify.log.info(`server listening on ${PORT}`)
    } catch (err) {
        fastify.log.error(err);
        process.exit(1)
    }
};
start();
