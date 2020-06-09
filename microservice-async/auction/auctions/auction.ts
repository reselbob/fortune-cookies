import { Nullable } from "./../types/nullable.ts";
import {
  Producer,
  Subscriber,
  Messenger,
  IMessageBrokerConfig,
  IMessageConfig,
  Message,
  AuctionEvent,
} from "./../messaging/mod.ts";

import { v4 } from "https://deno.land/std/uuid/mod.ts";

enum AssetClass {
  HTML,
  IMAGE,
  VIDEO,
  AUDIO,
}

interface IAuctionConfig {
  description: string;
  startDate: Date;
  endDate: Date;
  assetClass: AssetClass;
  heightInPx?: number;
  widthInPx?: number;
  durationInSecs?: number;
  minimumBidAmount: number;
  messagingConfig: IMessageBrokerConfig;
}

interface IAuction extends IAuctionConfig {
  id: string;
  highBid: Nullable<IBid>;
  bids: Array<IBid>;
  topics: AuctionTopics;
  producer: Producer;
  subscribers: Array<Subscriber>;
  InitializeAsync(): Promise<void>;
  createNewAuctionMessage(): Message;
}

interface IWinningBid extends IBid {
  isWinner: Boolean;
}

interface IBid {
  id: string;
  auctionId: string;
  createDate: Date;
  amount: number;
  bidder: IBidder;
}

interface IContact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface IBidder extends IContact {
  companyName?: string;
  intentoryItems?: [IInventoryItem];
}

interface IInventoryItem {
  id: string;
  name: string;
  url: string;
  description?: string;
  assetClass: AssetClass;
  heightInPx: number;
  widthInPx: number;
  duration: number;
}

class AuctionTopics {
  constructor(id:string){
    this.AuctionStart = `AUCTION_START_${id}`;
    this.BidOnAuction = `BID_TO_AUCTION_${id}`;
    this.SubcribeToAuction = `SUBSCRIBE_TO_AUCTION_${id}`;

  }
  public AuctionStart: string;
  public BidOnAuction: string;
  public SubcribeToAuction: string
}

class Auction extends Messenger implements IAuction {
  constructor(config: IAuctionConfig) {
    super(config.messagingConfig);
    this.id = v4.generate();
    this.description = config.description;
    this.startDate = config.startDate;
    this.endDate = config.endDate;
    this.assetClass = config.assetClass;
    this.heightInPx = config.heightInPx;
    this.widthInPx = config.widthInPx;
    this.durationInSecs = config.durationInSecs;
    this.minimumBidAmount = config.minimumBidAmount || 0;
    this.bids = new Array<IBid>();
    this.highBid = null;
    this.topics = new AuctionTopics(this.id)
    this.subscribers = new Array<Subscriber>();
    this.messagingConfig = config.messagingConfig;
    this.InitializeAsync();
  }
  public messagingConfig: IMessageBrokerConfig;
  public id: string;
  public description: string;
  public startDate: Date;
  public endDate: Date;
  public assetClass: AssetClass;
  public heightInPx?: number;
  public widthInPx?: number;
  public durationInSecs?: number;
  public minimumBidAmount: number;
  public highBid: Nullable<IBid>;
  public bids: Array<IBid>;
  public subscribers: Array<Subscriber>;
  public topics: AuctionTopics


 
  public InitializeAsync = async () => {
    const startMessage: string = JSON.stringify(this.createNewAuctionMessage())
    console.log({ notification: "Sending start message",startMessage});
    await this.producer.publish(this.topics.AuctionStart, startMessage);
    const className = this.constructor.name;

    console.log(`Sent start message from class: ${className}`);
    const pub = new Producer(this.messagingConfig);

    console.log(`Saving data from class: ${className}`);
    //TODO save initialization data
    console.log(`Saved data from class: ${className}`);
  };

  public createNewAuctionMessage(): Message {
    const payload: Object = {
      description: "Sample",
      startDate: this.startDate,
      endDate: this.endDate,
      assetClass: this.assetClass,
      heightInPx: this.heightInPx,
      widthInPx: this.widthInPx,
      durationInSecs: this.durationInSecs,
      minimumBidAmount: this.minimumBidAmount,
    };
    const config: IMessageConfig = {
      auction_id: v4.generate(),
      event: AuctionEvent.AUCTION_START,
      payload,
    };
    return new Message(config);
  }
}

export { IAuctionConfig, IAuction, Auction, AssetClass };
