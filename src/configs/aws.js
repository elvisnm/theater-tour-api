const env = process.env;

export default {
    s3Host: env.AWS_S3_HOST || 'https://s3.amazonaws.com',
    s3Bucket: env.AWS_S3_BUCKET || 'theater-tour',
    accessKeyId: env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY || '',
    region: env.AWS_REGION || 'us-east-1',
    collectionsSnsArn: env.AWS_SNS_TOPIC_ARN ||
        ''
};
