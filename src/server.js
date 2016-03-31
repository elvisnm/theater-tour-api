import Hapi from 'hapi';
import serverConfig from './configs/server';
import Inert from 'inert';
import Vision from 'vision';
import HapiSwagger from 'hapi-swagger';
import packageJson from '../package';

const options = {
    info: {
        title: 'Theater Tour API - Documentação',
        version: packageJson.version
    }
};

const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';

// Defining server instance
const server = new Hapi.Server();

// Options of the good plugin
const goodPluginOptions = {
    reporters: [
        {
            reporter: 'good-console',
            events: {log: '*', request: '*', response: '*'}
        }
    ]
};

// Defining plugins list
const plugins = [
    Inert,
    Vision,
    {register: require('good'), options: goodPluginOptions},
    {register: require('./plugins/StoresAutoloader').default},
    {register: require('./plugins/HandlersAutoloader').default},
    {register: require('./plugins/RoutesAutoloader').default},
    {register: HapiSwagger, options}
];

// Development only plugins
if (IS_DEVELOPMENT) {
    plugins.push({
        register: require('reptile'),
        options: {
            context: {
                apiServer: server,
                app: server.app,
                plugins: server.plugins
            },
            replOptions: {prompt: 'theater-tour-api > '}
        }
    });
}

// Configuring server connection
server.connection(serverConfig);

/**
 * Start server, we expose this to start the server else where
 *
 * @param {function} done a callback to be executed when server hast finished starting
 * @param {Array} extraPlugins extra plugins to register at server start
 * @returns {Hapi.Server}
 */
export default function start(done, extraPlugins = []) {
    // Registering plugins
    server.register(plugins.concat(extraPlugins), (err) => {
        if (err) {
            return done(err);
        }

        // All plugins was registered, now we can start the server
        return server.start(serverErr => {
            if (serverErr) {
                return done(serverErr);
            }

            if (process.send) {
                process.send('online');
            }

            if (IS_DEVELOPMENT) {
                console.log('REPL available via telnet localhost 9001');
            }

            console.log('Server running at: ', server.info.uri);

            return done();
        });
    });

    return server;
}
