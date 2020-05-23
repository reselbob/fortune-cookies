import {
  assertEquals,
  assertStrContains,
} from "https://deno.land/std/testing/asserts.ts";

import { AuctionFactory } from "../factory/auction_factory.ts";
import { Auction, IAuctionConfig, AssetClass } from "../factory/auction.ts";
import { Random } from "https://deno.land/x/random/Random.js";
import { IMessageBrokerConfig } from "../messaging/mod.ts";
import { v4 } from "https://deno.land/std/uuid/mod.ts";

const random = new Random();

function createAuctionConfig(): IAuctionConfig {
  const brokerConfig: IMessageBrokerConfig = {
    host: "127.0.0.1",
    port: 6379,
  };

  const config: IAuctionConfig = {
    endDate: new Date().getDate() + random.int(1, 10),
    startDate: new Date(),
    description: random.string(12),
    assetClass: AssetClass.IMAGE,
    heightInPx: random.int(100, 1000),
    widthInPx: random.int(100, 1000),
    minimumBidAmount: random.int(100, 300),
    messagingConfig: {
      host: "127.0.0.1",
      port: 6379,
      inTopic: v4.generate(),
      outTopic: v4.generate(),
    },
  };
  return config;
}

Deno.test({
  name: "AuctionFactory create Auction Test",
  async fn() {
      const config = createAuctionConfig();
      const auction: Auction = AuctionFactory.createAuction(config)
      assertEquals(auction instanceof Auction, true);
      const json = JSON.stringify(JSON.stringify);
      console.log(auction);
  },
  sanitizeResources: true,
  sanitizeOps: true,
});
