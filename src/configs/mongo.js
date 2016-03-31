const env = process.env;

const user = env.MONGO_USER || 'root';
const password = env.MONGO_PASSWORD || '';
const host = env.MONGO_HOST || '127.0.0.1';
const port = env.MONGO_PORT || '27017';
const database = env.MONGO_DATABASE || 'theater-tour';
const options = {
    server: {
        socketOptions: {
            keepAlive: 120
        },
        poolSize: (parseInt(env.MONGO_POOLSIZE, 10) || 100)
    },
    replset: {
        socketOptions: {
            keepAlive: 120
        },
        readPreference: `ReadPreference.${(env.MONGO_READPREF || 'primary')}`,
        poolSize: (parseInt(env.MONGO_POOLSIZE, 10) || 100)
    }
};

export default {
    //uri: `mongodb://${user}:${password}@${host}:${port}/${database}`,
    uri: `mongodb://${host}:${port}/${database}`,
    options: options
};
