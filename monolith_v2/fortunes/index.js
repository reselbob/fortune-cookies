const fs = require('fs');
const path = require('path');
const {saveFortune, getFortunes: dbGetFortunes, fortunesExist} = require('../dataManager');

let fortunes;
const loadFortunesSync = ()=>{
    if(!process.env.FORTUNES){
        const arr= [];
        const filespec = path.join(__dirname, 'fortunes.txt');
        require('fs').readFileSync(filespec, 'utf-8').split(/\r?\n/).forEach(function(line){
            arr.push({fortune:line});
        });
        console.log("Data initialized at : " + new Date());
        process.env.FORTUNES = JSON.stringify(arr);
    }
    return JSON.parse(process.env.FORTUNES);
}
const getRandomFortune = async ()=>{
    if(! fortunes) fortunes = await getFortunes();
    max = fortunes.length;
    min = 0;

    const idx =  Math.floor(Math.random()*(max-min+1)+min);
    return fortunes[idx];
};

const getFortunes = async ()=>{
    if(! fortunes) fortunes = await dbGetFortunes();
    const forts = []
    for(let i=0; i< fortunes.length;i++){
        forts.push({fortune: fortunes[i].fortune});
    }
    return forts;
};

const seed = async () => {
    if(await fortunesExist()){
        console.log(`Fortunes data already exists at ${new Date()}`)
        return
    }
    const forts = loadFortunesSync();
    for(let i = 0; i< forts.length;i++){
        console.log(`Seeding fortune: ${forts[i].fortune} at ${new Date()}`)
        const f  = await saveFortune(forts[i].fortune);
        console.log(`Seeded fortune: ${f.dataValues.fortune} at ${new Date()}`)
    }
}

module.exports = {getRandomFortune,getFortunes, seed};
