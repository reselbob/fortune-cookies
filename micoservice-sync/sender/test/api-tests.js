const expect = require('chai').expect;
const describe = require('mocha').describe;
const it = require('mocha').it;
const should = require('chai').should();
const faker = require('faker');
const supertest = require('supertest');
const {server,shutdown} = require('../index');

describe('API Tests: ', () => {
    after(function () {
        shutdown();
    });

    it('Can  POST to sender', function(done){
        const obj= {data: faker.lorem.words(3)};
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