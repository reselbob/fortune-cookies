const fs = require('fs');
const path = require('path');
const {saveFortune, getFortunes} = require('../dataManager');
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

const fortunes = loadFortunesSync();

const getRandomFortune = async ()=>{
    max = fortunes.length;
    min = 0;

    const idx =  Math.floor(Math.random()*(max-min+1)+min);
    return fortunes[idx];
};

const getFortunes = async ()=>{
    return loadFortunesSync();
};

const seed = async () => {
    const fortunes = loadFortunesSync();
    fortunes.forEach(fortune => {
        console.log(`Seeding fortune: ${fortune} at ${new Date()}`)
        await saveFortune(fortune);
        console.log(`Seeded fortune: ${fortune} at ${new Date()}`)
    });
}

module.exports = {getRandomFortune,getFortunes, seed};
