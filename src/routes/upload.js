export default function getUploadRoutes(server) {
    return [
        {
            method: 'POST',
            path: '/upload',
            handler: server.app.handlers.upload.upload,
            config: {
                payload: {
                    output: 'stream',
                    parse: true,
                    maxBytes: 10485760
                }
            }
        }
    ];
}
