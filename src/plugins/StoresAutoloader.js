import requireDir from 'require-dir';

const StoresAutoloader = {
    register(server, options, next) {
        server.app.stores = requireDir('../stores', {recurse: true});

        next();
    }
};

StoresAutoloader.register.attributes = {
    name: 'stores-autoloader',
    version: '0.0.1'
};

export default StoresAutoloader;
