const uuidv4 = require('uuid/v4');
const fs = require('fs');
const path = require('path');
const {promisify} = require('util');
const _ = require('lodash');
const {getDependencyApiUrl} = require('../dependencies');
const axios = require('axios');


/*
ScheduleItem = {
  id: uuid
  firstName: string,
  lastName: string,
  email: string
}
*/

const objectToFile = async (filespec, data) => {
  const writeFile = promisify(fs.writeFile);
  return await writeFile(filespec, JSON.stringify(data), "utf8");
};

const dataFileName = 'scheduleItems.json';
/*
const getFortune = async () => {
  const url = getDependencyApiUrl('FORTUNE');
  const res = await axios.get(url);
  return res.body.fortune;
};
*/
const postToSender = async (scheduleItem) => {
  const url = getDependencyApiUrl('SENDER_API_URL');
  const res = await axios.post(url, scheduleItem);
  if (res.status >= 400) {
    throw new Error({status: res.status, message: res.message});
  }
};

const createScheduleItem = async (ScheduleItem) => {
  const period = ScheduleItem.period || '* * * * * *'; //every second is the default
  //ScheduleItem.fortune = await getFortune();
  const job = new CronJob(period, async function () {
    console.log({postingToSender: ScheduleItem, time: new Date().toString()});
    await postToSender(ScheduleItem);
    console.log({postedToSender: ScheduleItem, time: new Date().toString()});
  }, null, true, 'America/Los_Angeles');
  job.start();

  ScheduleItem.job = job;
  return ScheduleItem;
};

const validateScheduleItem = (ScheduleItem) => {
  const arr = [];
  if (!ScheduleItem.firstName) arr.push('firstName');
  if (!ScheduleItem.lastName) arr.push('lastName');
  if (!ScheduleItem.email) arr.push('email');
  if (!ScheduleItem.phone) arr.push('phone');
  if (!ScheduleItem.target) arr.push('target');
  if (!ScheduleItem.interval) arr.push('interval');

  if (arr.length > 0) {
    const str = `The following required properties are missing for the submitted ScheduleItem: ${JSON.stringify(arr)}.`;
    throw new Error(str);
  }

  if (arr.length > 0) return arr;
};

const addScheduleItem = async (ScheduleItem) => {
  validateScheduleItem(ScheduleItem);

  ScheduleItem.id = uuidv4();
  //add the ScheduleItem to data store
  const itm = await createScheduleItem(ScheduleItem);
  //store and add to global array
  await updateScheduleItems(itm);
  return ScheduleItem;
};

const updateScheduleItems = async (ScheduleItem) => {
  const arr = getScheduleItemsSync();
  arr.push(ScheduleItem);
  const filespec = path.join(__dirname, dataFileName);
  await objectToFile(filespec, arr);
  return arr;
};

const getScheduleItem = async (id) => {
  const ScheduleItems = await getScheduleItems();
  return _.find(ScheduleItems, {'id': id});
};


const getScheduleItemsSync = () => {
  let arr = [];
  const filespec = path.join(__dirname, dataFileName);
  if (fs.existsSync(filespec)) {
    arr = JSON.parse(fs.readFileSync(filespec, 'utf-8'));
  }
  return arr;
};

const deleteScheduleItem = async (id) => {
  const ScheduleItems = await getScheduleItems();
  _.remove(ScheduleItems, {id: id});
  const filespec = path.join(__dirname, dataFileName);
  await objectToFile(filespec, ScheduleItems);
  return {removed: id};
};

const getScheduleItems = async () => {
  const readFileAsync = promisify(fs.readFile);
  const filespec = path.join(__dirname, dataFileName);
  const reslt = await readFileAsync(filespec, 'utf-8');
  return JSON.parse(reslt);
};
module.exports = {getScheduleItemsSync, addScheduleItem, getScheduleItems, getScheduleItem, deleteScheduleItem};
