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
    name: "Standalone Subscriber Test",
    async fn() {

        const queueName = v4.generate();
        const message = getRandomString(10);

        await delay(1000);
        await publish(queueName, message)

        const handler = (args: any, props: any, data: any) => {
            const result = (new TextDecoder().decode(data));
            console.log({subcriberResponse:result});
        };

        const conn = await createSubscriber(queueName, handler)

        await delay(2000);
        conn.close();

    },
    sanitizeResources: false,
    sanitizeOps: false,
  });


Deno.test({
    name: "Standalone Publisher Test",
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