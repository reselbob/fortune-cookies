const expect = require('chai').expect;
const describe = require('mocha').describe;
const it = require('mocha').it;
const should = require('chai').should();
const faker = require('faker');
const supertest = require('supertest');
const {server, shutdown} = require('../index');
const {createFakeUser} = require('./test-utils');

describe('Message Gen API Tests: ', () => {

    after(function () {
        shutdown();
    });

    it('Can  POST USER to MessageGen', function(done){
        const user = createFakeUser();
        user.target = "EMAIL";
        const msg = {target: 'USERS', payload: user};

        supertest(server)
            .post('/')
            .set('Accept', 'application/json')
            .send(msg)
            .then((res) => {
                expect(res.body).to.be.an('object');
                done();
            })
            .catch(done);
    });

    it('Can  GET Targets ', function(done){
        supertest(server)
            .get('/targets')
            .set('Accept', 'application/json')
            .then((res) => {
                expect(res.body.targets).to.be.an('array');
                done();
            })
            .catch(done);
    });

    it('Can  GET Random User ', function(done){
        supertest(server)
            .get('/random/user')
            .set('Accept', 'application/json')
            .then((res) => {
                expect(res.body).to.be.an('object');
                done();
            })
            .catch(done);
    });

});