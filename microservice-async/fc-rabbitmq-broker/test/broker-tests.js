const {Publisher} = require('../publisher');
const {Subscriber} = require('../subscriber');

const expect = require('chai').expect;
const describe = require('mocha').describe;
const it = require('mocha').it;
const should = require('chai').should();
const faker = require('faker');

const {wait} = require('./test-utils');

const topic = 'reselbobTopic01';
const queue = 'reselbobQueue01';


describe('Publisher Tests: ', () => {
    afterEach(() => {
        wait(1000);
    });

    it('Can  Publish message', function (done) {
        const message = JSON.stringify({sendDate: new Date(), data: faker.lorem.words(3)});
        const publisher = new Publisher(topic);
        publisher.publish(message);
        done();
    });

    it('Can  Subscribe to Topic and get message', async function(done){
        this.timeout(15000);
        let subscriber;
        const onMessageFunction = (data, channelWrapper) => {
            const message = data.content.toString();
            console.log("subscriber: got message", message);
            //channelWrapper.ack(data);
            subscriber.close();
            done();
        };
        subscriber = new Subscriber(topic,queue, onMessageFunction);
        const message = JSON.stringify({sendDate: new Date(), data: faker.lorem.words(3)});

        wait(3000)
        const publisher = new Publisher(topic);
        await publisher.publish(message);
        console.log(message);

    });
});