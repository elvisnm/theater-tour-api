function getStore(request) {
    return request.server.app.stores.theaters;
}

/**
 * Replies all theaters
 *
 * @param {Hapi.Request} request the hapi request object
 * @param {Hapi.Reply} reply the hapi reply function
 */
export function findAll(request, reply) {
    getStore(request).getAll()
        .then(theaters => reply({
            statusCode: 200,
            message: 'Theaters found successfully.',
            data: theaters,
            meta: {
                total: theaters.length
            }
        }))
        .catch(err => reply({
            statusCode: 500,
            message: 'An error occurred while trying to retrieve theaters.',
            errors: [err.message]
        }).code(500));
}

/**
 * Replies the theater by name
 *
 * @param {Hapi.Request} request the hapi request object
 * @param {Hapi.Reply} reply the hapi reply function
 */
export function findOne(request, reply) {
    getStore(request).getById(request.params.id)
        .then(theater => reply({
            statusCode: 200,
            message: 'Theater found successfully.',
            data: theater
        }))
        .catch(err => reply({
            statusCode: 404,
            message: 'Theater not found.',
            errors: [err.message]
        }).code(404));
}

/**
 * Creates a new theater or updates an existing one
 *
 * @param {Hapi.Request} request the hapi request object
 * @param {Hapi.Reply} reply the hapi reply function
 */
export function createOrUpdate(request, reply) {
    getStore(request).save(request.payload)
        .then(theater => reply({
            statusCode: 200,
            message: 'Theater was saved successfully.',
            data: theater
        }))
        .catch(err => reply({
            statusCode: 500,
            message: 'An error occurred while trying to save the theater.',
            errors: [err.message]
        }).code(500));
}

/**
 * Removes an existing theater
 *
 * @param {Hapi.Request} request the hapi request object
 * @param {Hapi.Reply} reply the hapi reply function
 */
export function remove(request, reply) {
    getStore(request).remove(request.params.id)
        .then(theater => reply({
            statusCode: 200,
            message: 'Theater removed successfuly.',
            data: theater
        }))
        .catch(err => reply({
            statusCode: 500,
            message: 'An error occurred while trying to remove the theater.',
            errors: [err.message]
        }).code(500));
}
