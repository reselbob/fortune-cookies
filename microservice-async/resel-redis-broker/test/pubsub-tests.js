const chai = require('chai');
const expect = require('chai').expect;
const describe = require('mocha').describe;
const it = require('mocha').it;
const should = require('chai').should();
const {Publisher} = require('../publisher');
const {Subscriber} = require('../subscriber');
const faker = require('faker');

const topic = 'reselbobTopic01';
let publisher;
let subscriber;

const wait =  (timeInMs) => {
    return new Promise(function(resolve) {
        return setTimeout(resolve, timeInMs);
    });
};

describe('PubSub Tests: ', () => {

    before(()=>{
        publisher = new Publisher(topic);
    });
    after( ()=>{
        subscriber.unsubscribe()
            .then(() => {
                return subscriber.close()
            })
            .then (() => {
            return publisher.close();
        });
    });

    it('PUBLISHER Can PING broker', function (done) {
        publisher.ping()
            .then(res => {
                expect(res).to.be.an('object');
                expect(res.response).to.equal('PONG');
                done()
            })
            .catch(err => {
                console.log(err);
                done(err)
            });
    })

    it('PUBLISHER Can Publish Message', function (done) {
        const str = faker.lorem.words(3);
        publisher.publish(str)
            .then(res => {
                expect(res).to.be.an('object');
                expect(res.response).to.equal(0);
                done()
            })
            .catch(err => {
                console.log(err);
                done(err)
            });
    })

    it('SUBSCRIBER Can get Message', function (done) {
        const str = faker.lorem.words(3);
        const handler = async (message) => {
            console.log(message);
        };


        subscriber = new Subscriber(topic, handler);

        wait(5);

        publisher.publish(str)
            .then(res => {
                console.log(res);
                done();
            })
            .catch(err => {
                console.log(err);
                done(err);
            })



    })
}).timeout(5000);