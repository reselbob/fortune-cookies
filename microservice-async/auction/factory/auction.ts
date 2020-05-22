import { Nullable } from "./../types/nullable.ts";

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

class Auction implements IAuction {
  constructor(config: IAuctionConfig) {
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
  }
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
}

export { IAuctionConfig, IAuction, Auction };
