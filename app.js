require('dotenv').config();
const fastify = require('fastify')({ logger: true })
const {validate} = require('./lib/mparticle-dataplan-client');

fastify.post('/', async (request, reply) => {
  // pass request body directly to batch validator
  return await validate(
    request.body, 
    // allow request headers to override env variables
    dataPlanId=request.headers['mp-dataplanid'] || process.env.dataplanId, 
    dataPlanVersion=request.headers['mp-dataplanversion'] || process.env.dataplanVersion
  );
});

// Run the server!
const start = async () => {
  try {
    await fastify.listen(3000, '0.0.0.0');
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start();