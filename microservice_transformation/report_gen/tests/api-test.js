'use strict';
const supertest = require('supertest');
const chai = require('chai');
const expect = require('chai').expect;
const describe = require('mocha').describe;
const it = require('mocha').it;

const {server,shutdown} = require('../index');

describe('API Tests: ', () => {
    after(function () {
        shutdown();
    });
    it('Can access GET /', function(done){
        //Go get all the lists
        supertest(server)
            .get('/')
            .set('Accept', 'application/json')
            .then((res) => {
                expect(res.body).to.be.an('object');
                expect(res.body.msg).to.be.a('string');
                console.log(res.body);
                done();
            })
            .catch(done);
    });
});
