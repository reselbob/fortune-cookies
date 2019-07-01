const chai = require('chai');
const expect = require('chai').expect;
const describe = require('mocha').describe;
const it = require('mocha').it;
const faker = require('faker');


const {addUser,getUsersSync} = require('../users');

const createFakeUser = () => {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const dob = faker.date.between('1950-01-01', '2001-12-31').toISOString().slice(0, 10);
    const email = `${firstName}.${lastName}@${faker.internet.domainName()}`;

    return {firstName, lastName, dob, email};

}

describe('User Tests: ', () => {
    it('Can add user', function(done){
        const user = createFakeUser();
        addUser(user)
            .then(user => {
                expect(user.id).to.be.a('string');
                done();
            })
            .catch(done);

    });

    it('Can get users', function(done){
        const users = getUsersSync();
        expect(users).to.be.an('array');
    });
});