import { Nullable } from "./../types/nullable.ts";
import {
  Producer,
  Subscriber,
  IMessengerConfig,
  Messenger,
  IMessageBrokerConfig,
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
  messagingConfig: IMessengerConfig;
}

interface IAuction extends IAuctionConfig {
  id: string;
  highBid: Nullable<IBid>;
  bids: Array<IBid>;
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
    this.messagingConfig = config.messagingConfig;
    this.InitializeAsync();
  }
  public messagingConfig: IMessengerConfig;
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

  private InitializeAsync = async () => {
    console.log('Sending start message');
    await this.producer.publish(this.outTopic, "started");
    console.log('Sent start message');

    console.log('Saving data');
    //TODO save initialization data
    console.log('Saved data');

    }
}



export { IAuctionConfig, IAuction, Auction };
