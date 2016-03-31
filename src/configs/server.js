export default {
    host: process.env.HOST || '0.0.0.0',
    port: process.env.PORT || 8080,
    routes: {
        cors: true
    }
};
