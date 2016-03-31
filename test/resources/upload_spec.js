var path = require('path');
var fs = require('fs');
var frisby = require('frisby');
var FormData = require('form-data');

var URL = require('../configs').baseApiUrl;

var testJpgPath = path.resolve(__dirname, '../mocks/test-image-jpg.jpg');
var testFormJpg = new FormData();
testFormJpg.append('file', fs.createReadStream(testJpgPath), {
    knownLength: fs.statSync(testJpgPath).size
});

var testPngPath = path.resolve(__dirname, '../mocks/test-image-png.png');
var testFormPng = new FormData();
testFormPng.append('file', fs.createReadStream(testPngPath), {
    knownLength: fs.statSync(testPngPath).size
});

var testFormMaxSize = new FormData();
testFormMaxSize.append('file', new Buffer(10485761), {
    contentType: 'image/jpeg',
    filename: 'test-max-size.jpg'
});

frisby.create('Upload JPG image succesfully')
    .post(URL + 'upload', testFormJpg, {
        json: false,
        headers: {
            'content-type': 'multipart/form-data; boundary=' + testFormJpg.getBoundary(),
            'content-length': testFormJpg.getLengthSync()
        }
    })
    .expectJSONTypes({
        statusCode: Number,
        message: String,
        data: {
            url: String
        }
    })
    .toss();

frisby.create('Upload PNG image succesfully')
    .post(URL + 'upload', testFormPng, {
        json: false,
        headers: {
            'content-type': 'multipart/form-data; boundary=' + testFormPng.getBoundary(),
            'content-length': testFormPng.getLengthSync()
        }
    })
    .expectJSONTypes({
        statusCode: Number,
        message: String,
        data: {
            url: String
        }
    })
    .toss();

frisby.create('Fail to try upload an image with length greater than maximum allowed 10485760 (10 MB)')
    .post(URL + 'upload', testFormMaxSize, {
        json: false,
        headers: {
            'content-type': 'multipart/form-data; boundary=' + testFormMaxSize.getBoundary(),
            'content-length': testFormMaxSize.getLengthSync()
        }
    })
    .expectStatus(400)
    .expectJSONTypes({
        statusCode: Number,
        error: String,
        message: String
    })
    .expectJSON({
        statusCode: 400,
        error: 'Bad Request',
        message: 'Payload content length greater than maximum allowed: 10485760'
    })
    .toss();

frisby.create('Fail to try upload an image without content')
    .post(URL + 'upload', {})
    .expectStatus(400)
    .expectJSONTypes({
        statusCode: Number,
        message: String,
        errors: Array
    })
    .toss();
