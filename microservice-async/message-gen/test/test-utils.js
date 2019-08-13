const faker = require('faker');
const _ = require('lodash');

const createFakeUser = () => {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const dob = faker.date.between('1950-01-01', '2001-12-31').toISOString().slice(0, 10);
  const email = `${firstName}.${lastName}@${faker.internet.domainName()}`;
  const phone = faker.phone.phoneNumber();
  const target = _.sample(['FACEBOOK', 'LINKEDIN', 'TWITTER', 'SMS', 'EMAIL']);
  return {firstName, lastName, dob, email,phone, target};
};

const getRandomIntFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};



module.exports = {createFakeUser, getRandomIntFromInterval};
