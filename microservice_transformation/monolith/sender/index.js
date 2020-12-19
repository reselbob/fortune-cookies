/*
config = {
  firstName:string
  lastName:string
  userId:string;
}
 */



const send = (config, fortune) =>{
    console.log(`Greetings from ${config.firstName} ${config.lastName}: ${fortune}`);

    // write sends to DB
};
module.exports = {send};