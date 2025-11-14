import "dotenv/config"
import Fastify from "fastify";

const server = Fastify({ logger: true });


server.get('/', async () => {
    return { message: 'Hello Form PostPulse API!'}
})

server.listen({ port:3001}, (err, address) => {
    if (err) {
        server.log.error(err)
        process.exit(1)
    }
    console.log(`Server running on ${address}`)
})