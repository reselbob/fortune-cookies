import { v4 } from "https://deno.land/std/uuid/mod.ts";
import {
    Producer,
    Subscriber,
    IMessageBrokerConfig,
  } from "./mod.ts";

  interface IMessengerConfig extends IMessageBrokerConfig{
      inTopic: string;
      outTopic: string;
  }

class Messenger{
    public inTopic: string;
    public outTopic: string;
    protected producer: Producer
    protected subscriber: Subscriber
    constructor(messengerConfig: IMessengerConfig){
        this.inTopic = v4.generate();
        this.outTopic = v4.generate();
        this.producer = new Producer(messengerConfig);
        this.subscriber = new Subscriber(messengerConfig);
    } 
}

export {Messenger, IMessengerConfig}