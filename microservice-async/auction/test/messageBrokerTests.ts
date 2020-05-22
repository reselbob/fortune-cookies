import {
  Producer,
  Subscriber,
  IMessageBrokerConfig,
} from "./../messageBroker/mod.ts";
import {
  assertEquals,
  assertStrContains,
} from "https://deno.land/std/testing/asserts.ts";

import { connect } from "https://denopkg.com/keroxp/deno-redis/mod.ts";
import { delay } from "https://deno.land/std/async/mod.ts";
import { Random } from "https://deno.land/x/random/Random.js";

const random = new Random();

const port = Deno.env.get("REDIS_PORT") || 6379;
const host = Deno.env.get("REDIS_HOST") || "localhost";
const pwd = Deno.env.get("REDIS_PWD") || "none";



Deno.test({
    name: "PubSub test",
    async fn() {
      const redis = await connect({
        hostname: "127.0.0.1",
        port: 6379,
      });
      const pub = await connect({
        hostname: "127.0.0.1",
        port: 6379,
      });
      const mychannel = 'MyChannel';
      const sub = await redis.subscribe(mychannel);
      const callback = async (message: string) => {
          console.log(message);
      }
      (async function () {
        for await (const { channel, message } of sub.receive()) {
          callback(`${channel}:${message}`);
        }
      })();
      for(let i: number = 0;i<10; i++){
        const msg: string = ` index: ${i} ${random.string(5)}`;
        await pub.publish(mychannel, msg);
        await delay(200);
      }
    },
    sanitizeResources: false,
    sanitizeOps: false,
  });

  Deno.test({
    name: "Subscriber test",
    async fn() {
      const msg: string = `The time is ${new Date()}`;
      const channel: string = "SubcriberTest";
      const config: IMessageBrokerConfig = {
        host: "127.0.0.1",
        port: 6379,
      };
  
      const producer: Producer = new Producer(config);
  
      const subscriber: Subscriber = new Subscriber(config);
      const callback = async (message: string) => {
        console.log({ date: new Date(), message });
      };
      const rsub = await subscriber.subscribe(channel, callback);
  
      for(let i: number = 0;i<10; i++){
        const str: string = random.string(5);
        console.log({message:str});
        await producer.publish(channel, str);
        await delay(200);
      }
    },
    sanitizeResources: false,
    sanitizeOps: false,
  });