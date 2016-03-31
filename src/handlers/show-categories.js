function getStore(request) {
    return request.server.app.stores['show-categories'];
}

/**
 * Replies all show categories
 *
 * @param {Hapi.Request} request the hapi request object
 * @param {Hapi.Reply} reply the hapi reply function
 */
export function getAll(request, reply) {
    getStore(request).getAll()
        .then(showCategories => reply({
            statusCode: 200,
            message: 'Show categories retrieved successfully.',
            data: showCategories,
            meta: {
                total: showCategories.length
            }
        }))
        .catch(err => reply({
            statusCode: 500,
            message: 'An error occurred while trying to retrieve all show categories.',
            errors: [err.message]
        }).code(500));
}

/**
 * Replies the show category by name
 *
 * @param {Hapi.Request} request the hapi request object
 * @param {Hapi.Reply} reply the hapi reply function
 */
export function getOne(request, reply) {
    getStore(request).getById(request.params.id)
        .then(category => reply({
            statusCode: 200,
            message: 'Show category found successfully.',
            data: category
        }))
        .catch(err => reply({
            statusCode: 404,
            message: 'Show category not found.',
            errors: [err.message]
        }).code(404));
}
