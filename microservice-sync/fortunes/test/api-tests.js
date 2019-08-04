const chai = require('chai');
const expect = require('chai').expect;
const describe = require('mocha').describe;
const it = require('mocha').it;
const should = require('chai').should();
const _ = require('lodash');
const supertest = require('supertest');
const {server,shutdown} = require('../index');

describe('API Tests: ', () => {
    after(function () {
        shutdown();
    });

    it('Can GET fortune', function(done){
        //Go get all the lists
        supertest(server)
            .get('/')
            .set('Accept', 'application/json')
            .then((res) => {
                expect(res.body).to.be.an('object');
                expect(res.body.fortune).to.be.a('string');
                done();
            })
            .catch(done);
    });

});