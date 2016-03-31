var frisby = require('frisby');

var URL = require('../configs').baseApiUrl;

frisby.create('GET healthcheck')
    .get(URL + 'healthcheck')
    .expectStatus(200)
    .expectBodyContains('Server: Ok')
    .toss();
