const chai = require('chai');
const expect = require('chai').expect;
const describe = require('mocha').describe;
const it = require('mocha').it;
const {saveFortune, getFortunes, touch, saveUser, getUsers, saveSentFortune, getSentFortune} = require('../dataManager');
const {createFakeUser} =  require('./test-utils');
const faker = require('faker');


describe('DataManager Tests: ', () => {
    it('Can get create dataManager sentFortune', async () =>
    {
        const user = createFakeUser();
        const res = await saveUser(user);
        expect(res).to.be.an('object')

        const users = await getUsers();
        const u = users.filter(item => item.id === res.dataValues.id);
        expect(u[0]).to.be.an('object');
        expect(u[0].dataValues.id).to.equal(res.dataValues.id);

        const fortunes = await getFortunes();

        const input = {
            firstName: res.dataValues.firstName,
            lastName: res.dataValues.lastName,
            fortune: fortunes[0].fortune
        }

        const sf = await saveSentFortune(input);
        const resp = await getSentFortune(sf.dataValues.id);
        expect(resp[0]).to.be.an('object')
        expect(resp[0].dataValues.id).to.equal(sf.dataValues.id);
    }).timeout(5000);

    it('Can get create dataManager fortune', async () =>
    {
        const fortune = faker.lorem.words(10);
        const res = await saveFortune(fortune);
        expect(res).to.be.an('object')

        const fortunes = await getFortunes();
        const f = fortunes.filter(item => item.id === res.dataValues.id);
        expect(f[0]).to.be.an('object');
        expect(f[0].dataValues.id).to.equal(res.dataValues.id);
    });

    it('Can get create dataManager user', async () =>
    {
        const user = createFakeUser();
        const res = await saveUser(user);
        expect(res).to.be.an('object')

        const users = await getUsers();
        const u = users.filter(item => item.id === res.dataValues.id);
        expect(u[0]).to.be.an('object');
        expect(u[0].dataValues.id).to.equal(res.dataValues.id);
    });

    it('Can touch data source', async () =>
    {
        const res = await touch()
        expect(res).to.be.an('object');
        expect(res.status).to.equal('OK');
    });
});
