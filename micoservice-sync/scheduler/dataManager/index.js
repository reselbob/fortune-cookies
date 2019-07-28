const uuidv4 = require('uuid/v4');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const _ = require('lodash');
/*
ScheduleItem = {
  id: uuid
  firstName: string,
  lastName: string,
  email: string
}
*/

const objectToFile = async (filespec, data) =>{
  const writeFile = promisify(fs.writeFile);
  return await writeFile(filespec, JSON.stringify(data),"utf8");
};

const dataFileName = 'scheduleItems.json';

const updateScheduleItem = async(ScheduleItem)=>{
  if(! ScheduleItem.id) throw new Error('Required attribute, [id] is missing.');
  const ScheduleItems = await getScheduleItems();
  const knownScheduleItem = _.find(ScheduleItems, {id:ScheduleItem.id});
  knownScheduleItem.firstName = ScheduleItem.firstName || knownScheduleItem.firstName;
  knownScheduleItem.lastName = ScheduleItem.lastName || knownScheduleItem.firstName;
  knownScheduleItem.email = ScheduleItem.email || knownScheduleItem.email;
  knownScheduleItem.lastUpdated = new Date();

  const filespec = path.join(__dirname, dataFileName);
  await objectToFile(filespec,ScheduleItems);
  return knownScheduleItem;
}

const addScheduleItem = async (ScheduleItem)=>{
  if(!ScheduleItem.firstName) throw new Error('No first name, please provide one.');
  if(!ScheduleItem.lastName) throw new Error('No last name, please provide one.');
  if(!ScheduleItem.email) throw new Error('No email, please provide one.');
  if(!ScheduleItem.phone) throw new Error('No phone, please provide one.');
  if(!ScheduleItem.target) throw new Error('No target, please provide one.');
  if(!ScheduleItem.interval) throw new Error('No interval, please provide one.');
  ScheduleItem.id = uuidv4();
  //add the ScheduleItem to data store
  await updateScheduleItems(ScheduleItem);

  return ScheduleItem;
};

const updateScheduleItems =  async (ScheduleItem) =>{
  const arr = getScheduleItemsSync();
  arr.push(ScheduleItem);
  const filespec = path.join(__dirname, dataFileName);
  await objectToFile(filespec,arr);
  return arr;
};

const getScheduleItem = async (id) => {
  const ScheduleItems = await getScheduleItems();
  return _.find(ScheduleItems, { 'id': id});
};


const getScheduleItemsSync = () =>{
  let arr = [];
  const filespec = path.join(__dirname, dataFileName);
  if(fs.existsSync(filespec)){
    arr  = JSON.parse(fs.readFileSync(filespec, 'utf-8'));
  }
  return arr;
};

const deleteScheduleItem = async (id)=> {
  const ScheduleItems = await getScheduleItems();
  _.remove(ScheduleItems, {id: id});
  const filespec = path.join(__dirname, dataFileName);
  await objectToFile(filespec,ScheduleItems);
  return {removed:id };
};

const getScheduleItems = async () =>{
  const readFileAsync = promisify(fs.readFile);
  const filespec = path.join(__dirname, dataFileName);
  const reslt = await readFileAsync(filespec, 'utf-8');
  return JSON.parse(reslt);
};
module.exports = {getScheduleItemsSync, addScheduleItem, getScheduleItems, getScheduleItem, deleteScheduleItem, updateScheduleItem};
