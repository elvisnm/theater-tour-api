import path from 'path';
import AWS from 'aws-sdk';
import UUID from 'uuid';
import mimeTypes from 'mime-types';
import _groupBy from 'lodash/groupBy';
import awsConfig from '../configs/aws';

AWS.config.update({
    accessKeyId: awsConfig.accessKeyId,
    secretAccessKey: awsConfig.secretAccessKey,
    region: awsConfig.region
});

const sns = new AWS.SNS();
const s3 = new AWS.S3({params: {Bucket: awsConfig.s3Bucket}});

const CREATION = 'Creation';
const DELETION = 'Deletion';

/**
 * Uploads a file to Amazon S3
 *
 * @param {Stream} file a file stream
 * @param {string} pathToSave a path name to save the file in
 * @param {Object} extraOptions extra S3 upload options
 * (see options docs at: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html)
 * @returns {Promise} A promise that resolves or rejects depending on the upload response
 */
export function s3Upload(file, pathToSave = '', extraOptions = {}) {
    return new Promise((resolve, reject) => {
        const fileExt = path.extname(file.hapi.filename);
        const fileContentType = mimeTypes.contentType(fileExt);
        const defaultPath = fileContentType && fileContentType.indexOf('image') !== -1 ?
            'images' :
            'others';
        const filePath = path.join(pathToSave || defaultPath, UUID.v4() + fileExt);
        const params = Object.assign(extraOptions, {
            Key: filePath,
            Body: file,
            ContentType: fileContentType,
            ACL: 'public-read'
        });

        s3.upload(params, err => {
            if (err) {
                return reject(err);
            }

            return resolve({url: `${awsConfig.s3Host}/${awsConfig.s3Bucket}/${filePath}`});
        });
    });
}

/**
 * Sends a message to amazon SNS
 *
 * @param {string} endpointArn the topic ARN
 * @param {Object} payload the payload data object
 * @param {Object} extraOptions the extra SNS send message options
 * (see options docs at: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/SNS.html)
 * @returns {Promise} A promise that resolves or rejects depending on the message response
 */
export function snsSendMessage(endpointArn, payload, extraOptions = {}) {
    return new Promise((resolve, reject) => {
        sns.publish(Object.assign(extraOptions, {
            TopicArn: endpointArn,
            Message: JSON.stringify(payload)
        }), (err, data) => {
            if (err) {
                return reject(err);
            }

            return resolve(data);
        });
    });
}

/**
 * Sends a publication message for a collection
 *
 * @param {Object} collection the collection object
 * @returns {Promise} A promise that resolves or rejects depending on the message response
 */
export function publishCollection(collection) {
    const types = _groupBy(collection.items, 'type');

    return snsSendMessage(awsConfig.collectionsSnsArn, {
        name: collection.name,
        operation: CREATION,
        hotels: types.hotel ? types.hotel.map(item => item.id) : [],
        packages: types.packages ? types.package.map(item => String(item.id)) : []
    });
}

/**
 * Sends a unpublication message for a collection
 *
 * @param {Object} collection the collection object
 * @returns {Promise} A promise that resolves or rejects depending on the message response
 */
export function unpublishCollection(collection) {
    return snsSendMessage(awsConfig.collectionsSnsArn, {
        name: collection.name,
        operation: DELETION
    });
}
