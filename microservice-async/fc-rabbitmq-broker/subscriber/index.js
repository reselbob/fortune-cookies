const amqp = require('amqplib');
const {validateDependencies, getMessageBrokerUrl} = require('../dependencies');

function validateConstructorParams(topic, queue) {
    const arr = [];
    if (!topic) arr.push('topic');
    if (!queue) arr.push('queue');
    if (arr.length > 0) throw new Error(`The following required parameters the Subscriber contructure are missing values: ${JSON.stringify(arr)}`);
}

class Subscriber {
    constructor(topic, queue, onMessageFunction) {
        validateDependencies();
        validateConstructorParams(topic, queue);

        const EXCHANGE_NAME = topic;
        const QUEUE_NAME = '';
        const url = getMessageBrokerUrl();
        const messageHandler = onMessageFunction;
        let connection;
        this.connection = connection;

        amqp.connect(url).then(function (conn) {
            connection = conn;
            process.once('SIGINT', function () {
                conn.close();
            });
            return conn.createChannel().then(function (ch) {
                let ok = ch.assertExchange(EXCHANGE_NAME, 'fanout', {durable: false});
                ok = ok.then(function () {
                    return ch.assertQueue(QUEUE_NAME, {exclusive: true});
                });
                ok = ok.then(function (qok) {
                    return ch.bindQueue(qok.queue, EXCHANGE_NAME, '').then(function () {
                        return qok.queue;
                    });
                });
                ok = ok.then(function (queue) {
                    return ch.consume(queue, messageHandler, {noAck: true});
                });
                return ok.then(function () {
                    console.log(' [*] Waiting for logs. To exit press CTRL+C');
                });

                function logMessage(msg) {
                    console.log(" [x] '%s'", msg.content.toString());
                }
            });
        }).catch(err =>{
            console.log(err)
        });
    }
    async close (){
        if(this.connection){
            await this.connection.close();
            this.connection = null;
        }
    }

}

module.exports = {
    Subscriber: Subscriber
};