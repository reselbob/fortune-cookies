const chai = require('chai');
const expect = require('chai').expect;
const describe = require('mocha').describe;
const it = require('mocha').it;
const should = require('chai').should();
const _ = require('lodash');
const supertest = require('supertest');
const {server,shutdown} = require('../index');
const {createFakeUser, getRandomIntFromInterval} =  require('./test-utils');

describe('API Tests: ', () => {
    after(function () {
        shutdown();
    });

    it('Can GET users', function(done){
        //Go get all the lists
        supertest(server)
            .get('/')
            .set('Accept', 'application/json')
            .then((res) => {
                expect(res.body).to.be.an('array');
                done();
            })
            .catch(done);
    });

    it('Can  POST user', function(done){
        const user = createFakeUser();
        supertest(server)
            .post('/')
            .set('Accept', 'application/json')
            .send(user)
            .then((res) => {
                expect(res.body).to.be.an('object');
                expect(res.body.id).to.a('string');
                expect(res.body.firstName).to.equal(user.firstName);
                expect(res.body.lastName).to.equal(user.lastName);
                expect(res.body.email).to.equal(user.email);
                expect(res.body.dob).to.equal(user.dob);
                done();
            })
            .catch(done);
    });

});