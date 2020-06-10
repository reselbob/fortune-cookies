import {connect, AmqpConnection} from "https://deno.land/x/amqp/mod.ts";
import {v4} from "https://deno.land/std/uuid/mod.ts";
import { delay } from "https://deno.land/std/async/mod.ts";

function getRandomString(length: number): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

async function publish(queueName: string, message: string): Promise<void> {
    const connection = await connect();
    const channel = await connection.openChannel();

    await channel.declareQueue({queue: queueName});
    await channel.publish(
        {routingKey: queueName},
        {contentType: "application/json"},
        new TextEncoder().encode(JSON.stringify({message})),
    );

    await connection.close();
}

async function publishToExchange(exchangeName: string, routingKey:string, message: string): Promise<void> {
    const connection = await connect();
    const channel = await connection.openChannel();

    await channel.declareExchange({exchange: exchangeName, type: "fanout"});
    await channel.publish(
        {exchange:exchangeName},
        {contentType: "application/json"},
        new TextEncoder().encode(JSON.stringify({message})),
    );
    await connection.close();
}

async function createExchangeSubscriber(exchangeName: string, queue: string, routingKey:string, handler: Function): Promise<AmqpConnection> {
    const connection = await connect();
    const channel = await connection.openChannel();    
    //create the queue
    await channel.declareQueue({queue, autoDelete: false });

    //bind it to the exchange
    try{await channel.bindQueue({ exchange: exchangeName, queue, routingKey });
    }catch(err) {
        throw(err);
    }
        

    await channel.consume(
        {queue},
        async (args, props, data) => {
          await handler(args, props, data);
          await channel.ack({ deliveryTag: args.deliveryTag });
        },
      );

    //create the consumer on the bound exchange
    return connection;
}



async function createSubscriber(queue: string, handler: Function): Promise<AmqpConnection>{
    const connection = await connect();
    const channel = await connection.openChannel();
    await channel.declareQueue({queue, autoDelete: false });
    await channel.consume(
        {queue},
        async (args, props, data) => {
          await handler(args, props, data);
          await channel.ack({ deliveryTag: args.deliveryTag });
        },
      );
    return connection;
};


Deno.test({
    name: "Exchange Subscriber Test",
    async fn() {
        const subscriberName1 = 'sub1';//v4.generate();
        const subscriberName2 = 'sub2';//v4.generate();
        const exchangeName = 'exchange1';//v4.generate();
        const message = getRandomString(10);
        const routingKey = 'myKey'

        const handler1 = (args: any, props: any, data: any) => {
            const result = (new TextDecoder().decode(data));
            console.log({id: "handler 1", subcriberResponse:result, received: new Date()});
        };
        const handler2 = (args: any, props: any, data: any) => {
            const result = (new TextDecoder().decode(data));
            console.log({id: "handler 2", subcriberResponse:result, received: new Date()});
        };

      
        await publishToExchange(exchangeName, routingKey, message);
        

        //Create one subscriber
        const routingKey1 = v4.generate();
        const conn1 = await createExchangeSubscriber(exchangeName, subscriberName1, routingKey, handler1 );
        //Create another subscriber
        const routingKey2 = v4.generate();
        const conn2= await createExchangeSubscriber(exchangeName, subscriberName2, routingKey, handler2 );

        await delay(2000);
        await publishToExchange(exchangeName, routingKey, message);
    
        conn1.close();
        conn2.close();
    },
    sanitizeResources: false,
    sanitizeOps: false,
  });

Deno.test({
    name: "Standalone Exchange Publisher Test",
    ignore: false,
    async fn() {
        const exchangeName = v4.generate();
        const message = getRandomString(10);
        const routingKey = 'myKey'
        await publishToExchange(exchangeName,routingKey, message)
    },
    sanitizeResources: false,
    sanitizeOps: false,
  });

Deno.test({
    name: "Standalone Subscriber Test",
    ignore: false,
    async fn() {

        const queueName = v4.generate();
        const message = getRandomString(10);

        await delay(1000);
        let i = 0;
        for(i = 0; i< 4; i++){
            await publish(queueName, message);
        }
        

        const handler1 = (args: any, props: any, data: any) => {
            const result = (new TextDecoder().decode(data));
            console.log({id: "handler 1", subcriberResponse:result, props, received: new Date()});
        };

        const handler2 = (args: any, props: any, data: any) => {
            const result = (new TextDecoder().decode(data));
            console.log({id: "handler 2", subcriberResponse:result, received: new Date()});
        };

        const conn1 = await createSubscriber(queueName, handler1);
        const conn2 = await createSubscriber(queueName, handler2);

        await delay(2000);
        conn1.close();
        conn2.close();

    },
    sanitizeResources: false,
    sanitizeOps: false,
  });


Deno.test({
    name: "Standalone Publisher Test",
    ignore: false,
    async fn() {
        const queueName = v4.generate();
        const message = getRandomString(10);
        await publish(queueName, message)
    },
    sanitizeResources: false,
    sanitizeOps: false,
  });


Deno.test({
    name: "AMQP General Test",
    ignore: false,
    async fn() {
        await delay(1000);
        console.log('Hi there');
        const queueName = v4.generate();
        const message = getRandomString(10);
        const connection1 = await connect();
        const channel1 = await connection1.openChannel();
        await channel1.declareQueue({ queue: queueName });
        console.log(JSON.stringify({ message }));
        await channel1.publish(
            { routingKey: queueName },
            { contentType: "application/json" },
            new TextEncoder().encode(JSON.stringify({ message })),
          );
        
        await delay(1000);

        await channel1.consume(
            { queue: queueName },
            async (args: any, props: any, data: any) => {
              console.log(JSON.stringify(args));
              console.log(JSON.stringify(props));
              console.log({response: new TextDecoder().decode(data)});
              await channel1.ack({ deliveryTag: args.deliveryTag });
            },
          );

          await delay(1000);
          await connection1.close();
    },
    sanitizeResources: false,
    sanitizeOps: false,
});