import mongoose from 'mongoose';

//Map global promise
mongoose.Promise = global.Promise;

//connect to db
const db = mongoose.connect('mongodb://localhost:27017/auctioncli');


//Import model
import { AuctionItem } from './models/auctionItems.js';

//Add Auction Item function
export const addAuctionItem = async (auction_item) => {
    try {
        const item = await AuctionItem.create(auction_item);
        console.info('New Auction Item Added:', item);
        return item;  
    } catch (err) {
        console.error('Error adding auction item:', err);
        throw err;  
    } finally {
        await mongoose.connection.close(); 
    }
};

// Find Auction Item function
export const findAuctionItem = (name) => {
    const search = new RegExp(name, 'i');
    AuctionItem.find({ title: search }).then(items => {
        console.info(items);
        console.info(`${items.length} matches`);
        mongoose.connection.close();
    }).catch(err => console.error(err));
};

//Update Auction Item
export const updateAuctionItem = async (id, updateData) => {
    try {
        const updatedItem = await AuctionItem.findByIdAndUpdate(id, updateData, { new: true });
        console.info('Auction Item Updated:', updatedItem);
        return updatedItem;  
    } catch (err) {
        console.error('Error updating auction item:', err);
        throw err;  
    } finally {
        await mongoose.connection.close();  
    }
};

//Remove auction item
export const removeAuctionItem = async (id) => {
    try {
        await AuctionItem.findByIdAndDelete(id);
        console.info('Auction Item Removed');
    } catch (err) {
        console.error('Error removing auction item:', err);
        throw err;
    } finally {
        await mongoose.connection.close();
    }
};

//function to list all items in the db
// index.js
export const listAuctionItems = async () => {
    try {
        const items = await AuctionItem.find({});
        console.info('Listing all auction items:');
        console.info(items);
        return items;  
    } catch (err) {
        console.error('Error listing auction items:', err);
        throw err;
    } finally {
        await mongoose.connection.close();
    }
};


