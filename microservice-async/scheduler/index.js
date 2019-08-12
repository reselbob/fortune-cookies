const {validateEnvVars, getDependencyEnvVar, Subscriber} = require('./messageBroker');
const {addScheduleItem, loadScheduleItems} = require('./dataManager');

/*
supported incoming message format
{
      firstName: string,
      lastName: string,
      dob: Date,
      email: string,
      phone: string,
      target: string,
      interval: string
      target: string
}

Outgoing message format
{
  target: string,
  payload:{
            firstName: string,
            lastName: string,
            dob: Date,
            email: string,
            phone: string
          }
  sendDate: Date
  sender: SCHEDULER
}
 */

validateEnvVars();
loadScheduleItems();

const onMessageReceived = async (channel, message) => {
    const msg = JSON.stringify(message);
    console.log(`[RECEIVED MESSAGE], ${msg} at ${new Date()}`);

    console.log(`Adding message ${msg} message, from, ${channel} at ${new Date()}.`);
    const res = await addScheduleItem(message);
    console.log(`Added message ${msg} from, ${channel} at ${new Date()} with response ${res}`);
};
const channel = getDependencyEnvVar('SCHEDULER_SOURCE_TOPIC');
const subscriber = new Subscriber(channel, onMessageReceived);
console.log(` Subscriber ${subscriber.id} is listening on channel, ${channel} at ${new Date()}.`);