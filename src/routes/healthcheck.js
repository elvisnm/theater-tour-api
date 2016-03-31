import redis from '../services/redis';

export default {
    method: 'GET',
    path: '/healthcheck',
    config: {
        handler: (request, reply) => {
            const checks = ['Server: Ok'];

            if (!redis.connected) {
                checks.push('Redis: Error');
            } else {
                checks.push('Redis: Ok');
            }

            reply(checks.join('\n'))
                .code(checks.some(s => s.indexOf('Error') !== -1) ? 500 : 200);
        },
        description: 'Retorna o status da API',
        tags: ['api', 'healthcheck']
    }
};
