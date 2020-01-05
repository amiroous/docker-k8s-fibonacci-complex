const configs = require('./configs');
const redis = require('redis');

const fibonacci = (index) => {
    if(index < 2) {
        return 1;
    }
    return fibonacci(index - 1) + fibonacci(index - 2);
};

/** ***************************************************************************************************************** */

const redisClient = redis.createClient({
    host: configs.redisHost,
    port: configs.redisPort,
    retry_strategy: () =>  1000
});

const redisSubscriber = redisClient.duplicate();

redisSubscriber.on('message', (channel, message) => {
    redisClient.hset('values', message, fibonacci(parseInt(message)));
});

redisSubscriber.subscribe('insert');
