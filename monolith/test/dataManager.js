const chai = require('chai');
const expect = require('chai').expect;
const describe = require('mocha').describe;
const it = require('mocha').it;
const {saveFortune, getFortunes} = require('../dataManager');
const faker = require('faker');


describe('DataManager Tests: ', () => {
    it('Can get create dataManager fortune', async () =>
    {
        const fortune = faker.lorem.words(10);
        const res = await saveFortune(fortune);
        expect(res).to.be.an('object')
    });
});
