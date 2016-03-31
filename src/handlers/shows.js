function getStore(request) {
    return request.server.app.stores.shows;
}

/**
 * Replies all shows
 *
 * @param {Hapi.Request} request the hapi request object
 * @param {Hapi.Reply} reply the hapi reply function
 */
export function getAll(request, reply) {
    getStore(request).getAll()
        .then(shows => reply({
            statusCode: 200,
            message: 'shows retrieved successfully.',
            data: shows,
            meta: {
                total: shows.length
            }
        }))
        .catch(err => reply({
            statusCode: 500,
            message: 'An error occurred while trying to retrieve all shows.',
            errors: [err.message]
        }).code(500));
}

/**
 * Replies the show by name
 *
 * @param {Hapi.Request} request the hapi request object
 * @param {Hapi.Reply} reply the hapi reply function
 */
export function getOne(request, reply) {
    getStore(request).getByCategoryAndSlug(request.params.category, request.params.slug)
        .then(show => reply({
            statusCode: 200,
            message: 'show found successfully.',
            data: show
        }))
        .catch(err => reply({
            statusCode: 404,
            message: 'show not found.',
            errors: [err.message]
        }).code(404));
}

/**
 * Creates a new show or updates an existing one
 *
 * @param {Hapi.Request} request the hapi request object
 * @param {Hapi.Reply} reply the hapi reply function
 */
export function createOrUpdate(request, reply) {
    getStore(request).save(request.payload)
        .then(savedShow => reply({
            statusCode: 200,
            message: 'show saved successfully.',
            data: savedShow
        }))
        .catch(err => reply({
            statusCode: 500,
            message: 'An error occurred when trying to save the show.',
            errors: [err.message]
        }).code(500));
}

/**
 * Publishes an existing show
 *
 * @param {Hapi.Request} request the hapi request object
 * @param {Hapi.Reply} reply the hapi reply function
 */
export function publish(request, reply) {
    getStore(request).publish(request.params.category, request.params.slug)
        .then(publishedShow => reply({
            statusCode: 200,
            message: 'show published successfully.',
            data: publishedShow
        }))
        .catch(err => reply({
            statusCode: 500,
            message: 'An Error occurred while trying to publish show.',
            errors: [err.message]
        }).code(500));
}

/**
 * Unpublishes an existing show
 *
 * @param {Hapi.Request} request the hapi request object
 * @param {Hapi.Reply} reply the hapi reply function
 */
export function unpublish(request, reply) {
    getStore(request).unpublish(request.params.category, request.params.slug)
        .then(publishedShow => reply({
            statusCode: 200,
            message: 'show unpublished successfully.',
            data: publishedShow
        }))
        .catch(err => reply({
            statusCode: 500,
            message: 'An Error occurred while trying to unpublish show.',
            errors: [err.message]
        }).code(500));
}

/**
 * Removes an existing show
 *
 * @param {Hapi.Request} request the hapi request object
 * @param {Hapi.Reply} reply the hapi reply function
 */
export function remove(request, reply) {
    getStore(request).remove(request.params.category, request.params.slug)
        .then(removedShow => reply({
            statusCode: 200,
            message: 'show removed successfully.',
            data: removedShow
        }))
        .catch(err => reply({
            statusCode: 500,
            message: 'An error occurred when trying to remove the show.',
            errors: [err.message]
        }).code(500));
}
