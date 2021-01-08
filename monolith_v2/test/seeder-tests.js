const chai = require('chai');
const expect = require('chai').expect;
const describe = require('mocha').describe;
const it = require('mocha').it;
const {seed: fortunesSeed} = require('../fortunes');
const {seed: usersSeed} = require('../users');
const {createFakeUser} =  require('./test-utils');
const faker = require('faker');


describe('Seeder Tests: ', () => {
    it('Can seed Fortunes', async () =>
    {
        const result = await fortunesSeed();
    })

    it('Can seed Users', async () =>
    {
        const result = await usersSeed();
    })
})
