import redis from 'redis';

function createClient() {
    return redis.createClient({
        port: 6000
    });
}

const client = createClient();

export default client;