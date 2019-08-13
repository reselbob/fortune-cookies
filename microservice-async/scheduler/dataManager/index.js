const uuidv4 = require('uuid/v4');
const fs = require('fs');
const path = require('path');
const {promisify} = require('util');
const _ = require('lodash');
const CronJob = require('cron').CronJob;
const {Publisher,getDependencyEnvVar} = require('../messageBroker');

/*
ScheduleItem = {
  id: uuid
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  dob: string,
  interval:string
  target: string
}
*/

const objectToFile = async (filespec, data) => {
    const writeFile = promisify(fs.writeFile);
    return await writeFile(filespec, JSON.stringify(data), "utf8");
};

const dataFileName = 'scheduleItems.json';

const postToSender = async (scheduleItem) => {
    scheduleItem.sendDate = new Date();
    const topic = getDependencyEnvVar('SCHEDULER_TARGET_TOPIC');
    const publisher = new Publisher(topic);
    const msg = JSON.stringify(scheduleItem);
    console.log(`[SCHEDULER] is using Publisher ${publisher.id} to publish message, ${msg} at ${new Date()}`);
    const res = await publisher.publish(msg);
    console.log(`[SCHEDULER] is used Publisher ${publisher.id} and published message, ${msg} at ${new Date()} with response ${res}.`);
};

const parseSchedulerItemToSendItemSync = (schedulerItem => {
    const UNKNOWN = 'unknown';
    const obj = {};
    obj.target = schedulerItem.target || UNKNOWN;
    obj.payload = {
        firstName: schedulerItem.firstName || UNKNOWN,
        lastName: schedulerItem.lastName || UNKNOWN,
        id: schedulerItem.id || UNKNOWN,
        phone: schedulerItem.phone || UNKNOWN,
        email: schedulerItem.email || UNKNOWN,
    };
    obj.sender = 'SCHEDULER';
    return obj
});


const createScheduleItem = async (ScheduleItem) => {
    const period = ScheduleItem.period || '* * * * * *'; //every second is the default
    //ScheduleItem.fortune = await getFortune();
    const itm = parseSchedulerItemToSendItemSync(ScheduleItem);
    const job = new CronJob(period, async function () {
        await postToSender(itm);
    }, null, true, 'America/Los_Angeles');
    job.start();
    return itm;
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

const loadScheduleItems = async () => {
    //if one is not provided, it will be created and returned
    const arr = [];

    const itms = await getScheduleItems();
    for (const itm of itms) {
        arr.push(await createScheduleItem(itm));
    }

    return arr
};
module.exports = {
    getScheduleItemsSync,
    addScheduleItem,
    getScheduleItems,
    getScheduleItem,
    deleteScheduleItem,
    loadScheduleItems
};
