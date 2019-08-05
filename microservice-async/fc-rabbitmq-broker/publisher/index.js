const amqp = require('amqplib');
const {getMessageBrokerUrl, validateDependencies} = require('../dependencies');

class Publisher {
    constructor(topic) {
        if(!topic) throw new Error('No topic defined. It\'s required. So declare one!')

        validateDependencies();

        const exchange = topic;
        const url = getMessageBrokerUrl();

        this.sendMessage = async (message) => {
            amqp.connect(url).then(function(conn) {
                return conn.createChannel().then(function(ch) {
                    const ok = ch.assertExchange(exchange, 'fanout', {durable: false})

                    return ok.then(function() {
                        ch.publish(exchange, '', Buffer.from(message));
                        console.log(" [x] Sent '%s'", message);
                        return ch.close();
                    });
                }).finally(function() { conn.close(); });
            }).catch(console.warn);
        }
    }

    async publish (message) {
        await this.sendMessage(message);
        return {status:'OK', message}
    }
}
module.exports = {
    Publisher: Publisher
};