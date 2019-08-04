const chai = require('chai');
const expect = require('chai').expect;
const describe = require('mocha').describe;
const it = require('mocha').it;
const should = require('chai').should();
const _ = require('lodash');

const {
  getScheduleItemsSync,
  addScheduleItem,
  getScheduleItems,
  getScheduleItem,
  deleteScheduleItem,
  updateScheduleItem,
  loadScheduleItems
} = require('../dataManager');

describe('API Tests: ', () => {
  it('Can LOAD ScheduleItems', function(done){
    loadScheduleItems()
      .then(result => {
        expect(result).to.be.an('array');
        done()
      })
      .catch(err => {
        console.log(err);
        done(err);
      })

  });

});
