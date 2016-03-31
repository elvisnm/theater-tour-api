export default function getShowCategoriesRoutes(server) {
    const showCategoriesHandlers = server.app.handlers['show-categories'];

    return [
        {
            method: 'GET',
            path: '/show-categories',
            handler: showCategoriesHandlers.getAll
        },
        {
            method: 'GET',
            path: '/show-categories/{id}',
            handler: showCategoriesHandlers.getOne
        }
    ];
}
