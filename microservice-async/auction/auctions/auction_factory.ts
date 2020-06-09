import { IAuctionConfig, IAuction, Auction } from "./auction.ts";

export type Status = { statusCode: number; message: string };

export class AuctionFactory{
  private auctions: Array<IAuction>;

  constructor(){
      this.auctions = new Array<IAuction>()
  }
  public static createAuction(config: IAuctionConfig): IAuction {
    return new Auction(config);
  }
}
