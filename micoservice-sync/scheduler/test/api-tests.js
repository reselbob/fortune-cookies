const chai = require('chai');
const expect = require('chai').expect;
const describe = require('mocha').describe;
const it = require('mocha').it;
const should = require('chai').should();
const _ = require('lodash');
const supertest = require('supertest');
const {server,shutdown} = require('../src/bin/www');
const {createFakeUser, getRandomIntFromInterval} =  require('./test-utils');

describe('API Tests: ', () => {
  after(function () {
    shutdown();
  });

  it('Can GET ScheduleItems', function(done){
    //Go get all the lists
    supertest(server)
      .get('/ScheduleItems')
      .set('Accept', 'application/json')
      .then((res) => {
        expect(res.body).to.be.an('array');
        done();
      })
      .catch(done);
  });

  it('Can  POST user', function(done){
    const user = createFakeUser();
    const scheduleItem ={};
    scheduleItem.firstName  = user.firstName;
    scheduleItem.lastName  = user.lastName;
    scheduleItem.email  = user.email;
    scheduleItem.phone  = '310-111-2222';
    scheduleItem.target = 'SMS';
    scheduleItem.interval =  '*/2 * * * * *' //run every two seconds

    supertest(server)
      .post('/ScheduleItems')
      .set('Accept', 'application/json')
      .send(scheduleItem)
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.id).to.a('string');
        expect(res.body.firstName).to.equal(scheduleItem.firstName);
        expect(res.body.lastName).to.equal(scheduleItem.lastName);
        expect(res.body.email).to.equal(scheduleItem.email);
        expect(res.body.interval).to.equal(scheduleItem.interval);
        expect(res.body.target).to.equal(scheduleItem.target);
        done();
      })
      .catch(done);
  });

});
