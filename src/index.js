if (process.env.NODE_ENV === 'development') {
    // In development we use babel on the fly
    require('babel-register');
}

// Pollyfill es6 environment
require('babel-polyfill');

/* eslint-disable vars-on-top, no-var */
var startServer = require('./server').default;

// Starting server
var server = startServer(err => {
    if (err) {
        throw err;
    }
});
/* eslint-enable vars-on-top, no-var */

// We need this when working with multiple node instances
process.on('message', message => {
    if (message === 'shutdown') {
        require('./services/redis').default.disconnect();
        server.stop();
        process.exit(0);
    }
});
