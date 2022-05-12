// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true })
const {validate} = require('./lib/mparticle-dataplan-client');

// Declare a route
fastify.post('/', async (request, reply) => {
  // track event to mParticle
  const check = await validate(
    request.body, 
    dataPlanId=request.headers['mp-dataplanid'], 
    dataPlanVersion=request.headers['mp-dataplanversion'], 
    dataPlanTTL=request.headers['mp-dataplanttl']);
        
  return check;
});

// Run the server!
const start = async () => {
  try {
    await fastify.listen(3000)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start();