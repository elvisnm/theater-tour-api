import requireDir from 'require-dir';

const HandlersAutoloader = {
    register(server, options, next) {
        server.app.handlers = requireDir('../handlers', {recurse: true});

        next();
    }
};

HandlersAutoloader.register.attributes = {
    name: 'handlers-autoloader',
    version: '0.0.1'
};

export default HandlersAutoloader;
