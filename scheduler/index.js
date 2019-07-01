const CronJob = require('cron').CronJob;
const {getRandomFortune} = require('../fortunes');
const {getUsersSync} = require('../users');
const {send} = require('../sender');

/*
config = {
  firstName:string
  lastname:string
  userId:string;
  period: string, default 1 second
}
 */

const createScheduleItem = async (config, globalSchedulerArray) => {
    if(! config) throw new Error('No ScheduleItem configuration object declared');
    if(! config.id) throw new Error('No ScheduleItem userId declared');
    const period = config.period || '* * * * * *';
    const job = new CronJob(period, async function() {
        const obj = await getRandomFortune();
        send(config,obj.fortune);
    }, null, true, 'America/Los_Angeles');
    job.start();

    config.job = job;
    //the the global scheduler array is present, then add the item to the array
    if(Array.isArray(globalSchedulerArray))globalSchedulerArray.push(config);

    return config;
};

const loadScheduleItems = async (globalSchedulerArray)=>{
    if(!Array.isArray(globalSchedulerArray)) throw new Error('The required parameter, globalSchedulerArray needs to be an array.')
    const users = getUsersSync();
    for(const user of users){
        globalSchedulerArray.push(await createScheduleItem(user));
    }
    return globalSchedulerArray;
};

module.exports = {createScheduleItem,loadScheduleItems};