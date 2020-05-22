import { connect, Redis } from "https://denopkg.com/keroxp/deno-redis/mod.ts";
import { Nullable } from "./../types/nullable.ts";
interface IMessageBrokerConfig {
  host: string;
  port: number;
}

class Broker {
  protected broker: Nullable<Redis>;
  protected config: IMessageBrokerConfig;
  constructor(config: IMessageBrokerConfig) {
    this.config = config;
    this.broker = null;
  }
}

class Subscriber extends Broker {
  constructor(config: IMessageBrokerConfig) {
    super(config);
    //this.LoadAsync(config);
  }

  private LoadAsync = async (config: IMessageBrokerConfig) => {
    if (!config.host || !config.port) {
      throw new Error(
        `Broker initialization error. host=${config.host}, port=${config.port}`,
      );
    }
    this.broker = await connect({ hostname: config.host, port: config.port });
    console.log("Broker connected");
  };

  public async subscribe(
    channel: string,
    messageHandler: { (message: string): void },
  ) {
    if(!this.broker){
      this.broker = await connect({
        hostname: this.config.host,
        port: this.config.port,
      }) 
    };
    if (!messageHandler) throw new Error("No message handler defined");
    if (!channel) throw new Error("No channel defined");
    const sub = await this.broker.subscribe(channel);
    (async function () {
      for await (const { channel, message } of sub.receive()) {
        // on message
        messageHandler(message);
      }
    })();

  }
}

class Producer extends Broker {
  constructor(config: IMessageBrokerConfig) {
    super(config);
  }

  public async publish(message: string, channel: string) {
    if(!this.broker){

    }
    this.broker = await connect({
      hostname: this.config.host,
      port: this.config.port,
    });
    return await this.broker.publish(channel, message);
  }
}
export { Producer, Subscriber, IMessageBrokerConfig };
