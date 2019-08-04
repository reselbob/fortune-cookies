const {getTargets} = require('../targets');
const fctestils = require('../../fc-testutils');
const faker = require('faker');


const setTargetEnvVars = () =>{
    const targets = getTargets();
    targets.forEach((itm, inx)=>{
        process.env[`${itm}_API_URL`] = `http://localhost:5001?target=${itm}`;
    });
};

const createSenderMessage = ()=>{
    const usr = fctestils.createFakeUser();
    usr.data = faker.lorem.words(3);
    return {
        target: usr.target,
        payload: usr
    }
};

module.exports = {setTargetEnvVars, createSenderMessage};