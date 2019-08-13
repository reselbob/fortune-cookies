const uuidv4 = require('uuid/v4');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const _ = require('lodash');

/*
user = {
  id: uuid
  firstName: string,
  lastName: string,
  email: string
  phone: string
  target: string
  interval: string
}
*/

const objectToFile = async (filespec, data) =>{
    const writeFile = promisify(fs.writeFile);
    return await writeFile(filespec, JSON.stringify(data),"utf8");
};

const dataFileName = 'users.json';

const updateUser = async(user)=>{
    if(! user.id) throw new Error('Required attribute, [id] is missing.');
    const users = await getUsers();
    const knownUser = _.find(users, {id:user.id});
    knownUser.firstName = user.firstName || knownUser.firstName;
    knownUser.lastName = user.lastName || knownUser.firstName;
    knownUser.email = user.email || knownUser.email;
    knownUser.lastUpdated = new Date();

    const filespec = path.join(__dirname, dataFileName);
    await objectToFile(filespec,users);
    return knownUser;
}

const addUser = async (user)=>{
    if(!user.firstName) throw new Error('No first name, please provide one.');
    if(!user.lastName) throw new Error('No last name, please provide one.');
    if(!user.email) throw new Error('No email, please provide one.');
    if(!user.phone) throw new Error('No phone, please provide one.');
    if(!user.target) throw new Error('No target, please provide one.');
    if(!user.interval) throw new Error('No interval, please provide one.');
    user.id = uuidv4();
    //add the user to data store
    await updateUsers(user);
    return user;
};

const updateUsers =  async (user) =>{
    const arr = getUsersSync();
    arr.push(user);
    const filespec = path.join(__dirname, dataFileName);
    await objectToFile(filespec,arr);
    return arr;
};

const getUser = async (id) => {
    const users = await getUsers();
    return _.find(users, { 'id': id});
};


const getUsersSync = () =>{
    let arr = [];
    const filespec = path.join(__dirname, dataFileName);
    if(fs.existsSync(filespec)){
        arr  = JSON.parse(fs.readFileSync(filespec, 'utf-8'));
    }
    return arr;
};

const deleteUser = async (id)=> {
    const users = await getUsers();
    _.remove(users, {id: id});
    const filespec = path.join(__dirname, dataFileName);
    await objectToFile(filespec,users);
    return {removed:id };
};

const getUsers = async () =>{
    const readFileAsync = promisify(fs.readFile);
    const filespec = path.join(__dirname, dataFileName);
    const reslt = await readFileAsync(filespec, 'utf-8');
    return JSON.parse(reslt);
};
module.exports = {getUsersSync, addUser, getUsers, getUser,deleteUser, updateUser};