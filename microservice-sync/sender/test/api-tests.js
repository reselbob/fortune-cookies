const expect = require('chai').expect;
const describe = require('mocha').describe;
const it = require('mocha').it;
const should = require('chai').should();
const faker = require('faker');
const supertest = require('supertest');
let app;
const fctestils = require('../../fc-testutils');
const {setTargetEnvVars, createSenderMessage} = require('./testutils');

describe('Sender API Tests: ', () => {
    before(() =>{
        setTargetEnvVars();
        fctestils.testServer;
        app = require('../index');


    })

    after(function () {
        app.shutdown();
        fctestils.stopServer();
    });

    it('Can  POST to sender', function(done){
        const msg = createSenderMessage();
        supertest(app.server)
            .post('/')
            .set('Accept', 'application/json')
            .send(msg)
            .then((res) => {
                expect(res.body).to.be.an('object');
                done();
            })
            .catch(done);
    });

});