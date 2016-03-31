import requireDir from 'require-dir';

const RoutesAutoloader = {
    register(server, options, next) {
        const routes = requireDir('../routes');

        Object.keys(routes).forEach(resourceName => {
            const routeConfig = routes[resourceName].default || routes[resourceName];

            if (typeof routeConfig === 'function') {
                // If we have an injector function, we call it injecting the server object
                server.route(routeConfig(server));
            } else if (routeConfig instanceof Array || typeof routeConfig === 'object') {
                // If it is valid route objects, we register it directly
                server.route(routeConfig);
            }
        });

        next();
    }
};

RoutesAutoloader.register.attributes = {
    name: 'routes-autoloader',
    version: '0.0.1'
};

export default RoutesAutoloader;
