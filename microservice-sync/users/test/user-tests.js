const chai = require('chai');
const expect = require('chai').expect;
const describe = require('mocha').describe;
const it = require('mocha').it;
const should = require('chai').should();
const _ = require('lodash');
const {createFakeUser, getRandomIntFromInterval} =  require('./test-utils');
const {addUser,getUsersSync, getUser, deleteUser, updateUser} = require('../dataManager');

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

    it('Can update user', function(done){
        let users = getUsersSync();
        const updatedUser = createFakeUser();
        //get a random user from the array.
        const i = getRandomIntFromInterval(0, users.length -1);
        const user = users[i];
        const oldUser = {firstName : user.firstName, lastName: user.lastName, email: user.email};
        updatedUser.id = user.id;
        updateUser(updatedUser)
            .then(result => {
                return getUser(updatedUser.id);
            })
            .then(result => {
                expect(result.firstName).to.equal(updatedUser.firstName);
                expect(result.lastName).to.equal(updatedUser.lastName);
                expect(result.email).to.equal(updatedUser.email);

                expect(result.firstName).to.not.equal(oldUser.firstName);
                expect(result.lastName).to.not.equal(oldUser.lastName);
                expect(result.email).to.not.equal(oldUser.email);
                done();
            })
            .catch(done);
    });

    it('Can get users', function(done){
        const users = getUsersSync();
        expect(users).to.be.an('array');
        done();
    });

    it('Can get known user', function(done){
        const user = createFakeUser();
        let knownUser;
        addUser(user)
            .then(result => {
                knownUser = result;
                return getUser(user.id)})
            .then(rslt => {
                expect(rslt.id).to.equal(knownUser.id)
                expect(knownUser.firstName).to.equal(rslt.firstName);
                expect(knownUser.lastName).to.equal(rslt.lastName);
                expect(knownUser.email).to.equal(rslt.email);
                done();
            })
            .catch(done);
    });

    it('Can delete known user', function(done){
        const user = createFakeUser();
        let knownUser;
        addUser(user)
            .then(result => {
                knownUser = result;
                return deleteUser(knownUser.id)})
            .then(rslt => {
                expect(rslt.removed).to.equal(knownUser.id);
                const users = getUsersSync();
                const noUser = _.find(users, {id:knownUser.id});
                should.equal(noUser, undefined);
                done();
            })
            .catch(done);
    });
});