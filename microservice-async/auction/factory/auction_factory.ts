import { IAuctionConfig, IAuction, Auction } from "./auction.ts";
export type Status = { statusCode: number; message: string };
interface IAuctionFactory {
  createAuction(config: IAuctionConfig): IAuction;
}

class AuctionFactory implements IAuctionFactory {
  private auctions: Array<IAuction>;
  constructor(){
      this.auctions = new Array<IAuction>()
  }
  public createAuction(config: IAuctionConfig): IAuction {
    return new Auction(config);
  }
}
