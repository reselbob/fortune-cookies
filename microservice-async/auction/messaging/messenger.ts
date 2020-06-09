import { v4 } from "https://deno.land/std/uuid/mod.ts";
import {
    Producer,
    Subscriber,
    IMessageBrokerConfig,
  } from "./mod.ts";
/*
  interface IMessengerConfig extends IMessageBrokerConfig{
      inTopic: string;
      outTopic: string;
  }
*/
class Messenger{
    //public inTopic: string;
    //public outTopic: string;
    public producer: Producer
    public subscribers: Array<Subscriber>
    constructor(messengerConfig: IMessageBrokerConfig){
        //this.inTopic = v4.generate();
        //this.outTopic = v4.generate();
        this.producer = new Producer(messengerConfig);
        this.subscribers = new Array<Subscriber>();
    }
}

export {Messenger}