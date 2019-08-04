const expect = require('chai').expect;
const describe = require('mocha').describe;
const it = require('mocha').it;
const should = require('chai').should();
const faker = require('faker');
const supertest = require('supertest');
const {server,shutdown} = require('../index');
const {createFakeUser} = require('test-utils');

describe('API Tests: ', () => {
    after(function () {
        shutdown();
    });

    it('Can  POST to sender', function(done){
        const payload = createFakeUser();
        payload.message = faker.lorem.words(3)
        const obj= {target: 'FACEBOOK', payload};
        supertest(server)
            .post('/')
            .set('Accept', 'application/json')
            .send(obj)
            .then((res) => {
                expect(res.body).to.be.an('object');
                done();
            })
            .catch(done);
    });

});