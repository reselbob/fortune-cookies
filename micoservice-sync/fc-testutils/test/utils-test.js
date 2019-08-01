const chai = require('chai');
const expect = require('chai').expect;
const describe = require('mocha').describe;
const it = require('mocha').it;
const should = require('chai').should();
const _ = require('lodash');
const supertest = require('supertest');
const utils = require('../index');

//{wait, createFakeUser, getRandomIntFromInterval,startServer, stopServer}

describe('Utils Tests: ', () => {
    after(function () {
        utils.stopServer();
    });

    it('Can GET', function(done){
        //Go get all the lists
        const target = 'FACEBOOK';
        supertest(utils.testServer)
            .get(`/?target=${target}`)
            .set('Accept', 'application/json')
            .then((res) => {
                expect(res.body).to.be.an('object');
                expect(res.body.target).to.equal(target);
                done();
            })
            .catch(done);
    });

    it('Can  POST user', function(done){
        const user = utils.createFakeUser();
        const target = 'FACEBOOK';
        supertest(utils.testServer)
            .post(`/?target=${target}`)
            .set('Accept', 'application/json')
            .send(user)
            .then((res) => {
                expect(res.body).to.be.an('object');
                expect(res.body.target).to.equal(target);
                done();
            })
            .catch(done);
    });

});