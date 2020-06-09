import { v4 } from "https://deno.land/std/uuid/mod.ts";
import { Nullable } from "./../types/nullable.ts";

enum AuctionEvent {
    AUCTION_START,
    SUBSCRIBE_TO_AUCTION,
    BID_TO_AUCTION
}

interface IMessage{
    id: string;
    auction_id: string;
    event: AuctionEvent;
    payload: Object;
}

interface IMessageConfig{
    auction_id: string;
    event: AuctionEvent;
    payload: Object;
}

class Message implements IMessage{
    constructor (config: IMessageConfig){
        this.id = v4.generate();
        this.auction_id = config.auction_id;
        this.event = config.event;
        this.payload = config.payload;
    }
    public id: string;
    public event: AuctionEvent;
    public auction_id: string;
    public payload: Object
}

export {Message, IMessage, IMessageConfig, AuctionEvent}