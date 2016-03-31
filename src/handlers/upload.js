import {s3Upload} from '../services/aws';

/**
 * Upload file to AWS S3
 *
 * @param {Hapi.Request} request the hapi request object
 * @param {Hapi.Reply} reply the hapi reply function
 */
export function upload(request, reply) {
    if (!request.payload.file) {
        return reply({
            statusCode: 400,
            message: 'An error occurred while parsing your request',
            errors: ['File must be selected.']
        }).code(400);
    }

    return s3Upload(request.payload.file)
        .then(data => reply({
            statusCode: 200,
            message: 'File uploaded successfully.',
            data
        })).catch(err => reply({
            statusCode: 500,
            message: 'An error occurred while trying to upload file.',
            errors: [err.message]
        }).code(500));
}
