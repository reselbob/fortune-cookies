'use strict';
const supertest = require('supertest');
const chai = require('chai');
const expect = require('chai').expect;
const describe = require('mocha').describe;
const it = require('mocha').it;

const server = require('../server');

describe('HTTP Tests: ', () => {
    after(function () {
        server.close();
    });
    it('Can access /api', function(done){
        //Go get all the lists
        supertest(server)
            .get('/api')
            .set('Accept', 'application/json')
            .then((res) => {
                expect(res.body.message).to.be.a('string');
                //process.exit(0)
                done();
            })
            .catch(done);
    });
});