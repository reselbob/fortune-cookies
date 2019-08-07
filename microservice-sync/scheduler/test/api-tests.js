const chai = require('chai');
const expect = require('chai').expect;
const describe = require('mocha').describe;
const it = require('mocha').it;
const should = require('chai').should();
const _ = require('lodash');
const supertest = require('supertest');
//const {server,shutdown} = require('../src/bin/www');
const {createFakeUser, getRandomIntFromInterval, getDependencies} =  require('./test-utils');
let fctestils;

let app;
let shutdown;

describe('API Tests: ', () => {
  before(() => {
    process.env.TEST_UTILS_PORT = 5001;
    fctestils = require('../../fc-testutils');
    fctestils.testServer;
    fctestils.setSenderTargetEnvVars();

    //process.env.SENDER_PORT = 5002;
    //process.env.SENDER_API_URL = `http://localhost:${process.env.SENDER_PORT}`;

    //process.env.FORTUNE_PORT = 5004;
    //process.env.FORTUNE_API_URL = `http://localhost:${process.env.FORTUNE_PORT}`;

    process.env.SCHEDULER_PORT = 5005;


    try {
      app = require('../src/bin/www');
    } catch (e) {
      console.log(e);
    }
    app.server;

  })
  after(function () {
    app.shutdown();
    fctestils.stopServer();

  });

  it('Can GET ScheduleItems', function(done){
    //Go get all the lists
    supertest(app.server)
      .get('/ScheduleItems')
      .set('Accept', 'application/json')
      .then((res) => {
        expect(res.body).to.be.an('array');
        done();
      })
      .catch(err => {
        console.log(err);
        done(err);
      });
  });

  it('Can  POST schedulerItem', function(done){
    const user = createFakeUser();
    const scheduleItem ={};
    scheduleItem.firstName  = user.firstName;
    scheduleItem.lastName  = user.lastName;
    scheduleItem.email  = user.email;
    scheduleItem.phone  = '310-111-2222';
    scheduleItem.target = 'SMS';
    scheduleItem.interval =  '*/2 * * * * *' //run every two seconds

    supertest(app.server)
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

  it('Cannot  POST scheduler', function(done){
    const user = createFakeUser();
    const scheduleItem ={};
    supertest(app.server)
      .post('/ScheduleItems')
      .set('Accept', 'application/json')
      .send(user)
      .then((res) => {
        expect(res.status).to.be.equal(500);
        done();
      })
      .catch(done);
  });
});
