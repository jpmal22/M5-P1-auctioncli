import mongoose from 'mongoose';


//Auction Item schema
const auctionItemSchema = new mongoose.Schema({
    title: { type: String },
    description: { type: String },
    start_price: { type: Number },
    reserve_price: { type: Number }
});

//Define and export
export const AuctionItem = mongoose.model('AuctionItem', auctionItemSchema);