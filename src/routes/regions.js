export default function getRegionsRoutes(server) {
    const regionsHandlers = server.app.handlers.regions;

    return [
        {
            method: 'GET',
            path: '/regions',
            handler: regionsHandlers.getAll
        }
    ];
}
