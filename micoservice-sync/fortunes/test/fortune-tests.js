const chai = require('chai');
const expect = require('chai').expect;
const describe = require('mocha').describe;
const it = require('mocha').it;
const should = require('chai').should();

const {getRandomFortune} = require('../dataManager');

describe('Fortunes Tests: ', () => {
    it('Can get fortune', function(done){
        getRandomFortune()
            .then(fortune => {
                expect(fortune).to.be.an('object');
                done();
            })
            .catch(done);
    });
});