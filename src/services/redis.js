import Redis from 'ioredis';
import redisConfig from '../configs/redis';

const redisSingleton = new Redis(redisConfig);

// Initial server connected state
redisSingleton.connected = false;

// Change server connected state when connected and ready
redisSingleton.on('ready', () => {
    redisSingleton.connected = true;
});

// Change server connected state whenever connection is lost
redisSingleton.on('close', () => {
    redisSingleton.connected = false;
});

// API documentation at https://github.com/luin/ioredis/blob/master/API.md
export default redisSingleton;
