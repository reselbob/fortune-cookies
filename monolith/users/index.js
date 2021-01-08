const uuidv4 = require('uuid/v4');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const faker = require('faker');
const {saveUser, getUsers: dbGetUsers, usersExist} = require('../dataManager');
/*
user = {
  id: uuid
  firstName: string,
  lastName: string,
  email: string
  period:string
  dob: date
  phone: string
}
*/

const objectToFile = async (filespec, data) =>{
    const writeFile = promisify(fs.writeFile);
    return await writeFile(filespec, JSON.stringify(data),"utf8");
};

const dataFileName = 'users.json';

const addUser = async (user)=>{
    if(!user.firstName) throw new Error('No first name, please provide one.');
    if(!user.lastName) throw new Error('No last name, please provide one.');
    if(!user.email) throw new Error('No email, please provide one.');
    if(!user.dob) throw new Error('No dob, please provide one.');
    //const period = user.period || '* * * * * *';
    //user.id = uuidv4();
    //add the user to data store
    return updateUsers(user);
};

const updateUsers =  async (user) =>{
    return await saveUser(user);
    /*
    const arr = getUsersSync();
    arr.push(user);
    const filespec = path.join(__dirname, dataFileName);
    await objectToFile(filespec,arr);
    return arr;

     */
};


const getUsersSync = () =>{
    let arr = [];
    const filespec = path.join(__dirname, dataFileName);
    if(fs.existsSync(filespec)){
        arr  = JSON.parse(fs.readFileSync(filespec, 'utf-8'));
    }
    return arr;
};

const getUsers = async () =>{
    const data  = await dbGetUsers();
    const users = [];
    for( let i = 0;i < data.length;i++){
        const obj = {
            id: data[i].dataValues.id,
            firstName: data[i].dataValues.firstName,
            lastName: data[i].dataValues.lastName,
            email: data[i].dataValues.email,
            dob: data[i].dataValues.dob,
            phone: data[i].dataValues.phone,
            period: data[i].dataValues.period
        }
        users.push(obj);
    }
    /*
    const readFileAsync = promisify(fs.readFile);

    const filespec = path.join(__dirname, dataFileName);
    const result = await readFileAsync(filespec, 'utf-8');
    return JSON.parse(result.toString());
     */

    return users;
};

const seed = async () => {
    if(await usersExist()){
        console.log(`Users data already exists at ${new Date()}`)
        return
    }

    const users = getUsersSync();

    const scrubbedUser = (aUser) => {
        const u = {
            firstName: aUser.firstName || faker.name.firstName(),
            lastName: aUser.lastName || faker.name.lastName(),
            dob: aUser.dob || faker.date.between('1950-01-01', '2001-12-31').toISOString().slice(0, 10),
            email: aUser.email || `${firstName}.${lastName}@${faker.internet.domainName()}`,
            phone: aUser.phone || faker.phone.phoneNumber()
        }

        return u;
    };

    for(let i = 0; i< users.length;i++){
        console.log(`Seeding user: ${users[i]} at ${new Date()}`);
        const u = await saveUser(scrubbedUser(users[i]));
        console.log(`Seeded user: ${JSON.stringify(u.dataValues)} at ${new Date()}`);
    }
}
module.exports = {getUsersSync, addUser, getUsers, seed};
