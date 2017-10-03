var chai = require('chai');
var chaiHttp = require('chai-http');
var server = "localhost:8080/api/userdata";
var request = require('request');


it('Main page content', function() {
    request('http://localhost:8080' , function(error, response, body) {
        expect(body).to.equal('Hello World');
    });
});