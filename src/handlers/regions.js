function getStore(request) {
    return request.server.app.stores.regions;
}

/**
 * Replies all regions
 *
 * @param {Hapi.Request} request the hapi request object
 * @param {Hapi.Reply} reply the hapi reply function
 */
export function getAll(request, reply) {
    getStore(request).getAll()
        .then(regions => reply({
            statusCode: 200,
            message: 'Regions retrieved successfully.',
            data: regions,
            meta: {
                total: regions.length
            }
        }))
        .catch(err => reply({
            statusCode: 500,
            message: 'An error occurred while trying to retrieve all regions.',
            errors: [err.message]
        }).code(500));
}
