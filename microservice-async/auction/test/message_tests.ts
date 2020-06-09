import { v4 } from "https://deno.land/std/uuid/mod.ts";
import {AssetClass} from '../auctions/mod.ts';
import { delay } from "https://deno.land/std/async/mod.ts";
import {
    IMessageConfig,
    Message,
    AuctionEvent,
    Producer,
    Subscriber,
    IMessageBrokerConfig,
  } from "./../messaging/mod.ts";

Deno.test({
    name: "Can create, send and receive Message object",
    async fn() {


      
        const payload: Object = {description: "Sample",
        startDate: new Date(), 
        endDate: new Date().getTime() + 10, 
        assetClass: AssetClass.IMAGE,
        heightInPx: 100, 
        widthInPx: 100,
        minimumBidAmount:500 }

        const channel: string = "MessagesTest";

        const bokerConfig: IMessageBrokerConfig = {
            host: "127.0.0.1",
            port: 6379,
          };

        const callback = async (message: string) => {
        console.log({ status: 'receiving', message, at: new Date(), });
        };

        const producer: Producer = new Producer(bokerConfig);
        const subscriber: Subscriber = new Subscriber(bokerConfig);

        const response = await subscriber.subscribe(channel, callback);

        const config: IMessageConfig  = {auction_id: v4.generate(),event:AuctionEvent.AUCTION_START, payload }
        
        const message = new Message(config)

        console.log({status: 'sending', message});
        await producer.publish(channel, JSON.stringify(message));
        await delay(200);
    },
    sanitizeResources: true,
    sanitizeOps: true,
  });