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

//function to seed many aution items into the db
export const seedAuctionItems = async () => {
    const auctionItems = [
        { title: "Camera", description: "Fujifil Xt4 2021 in excellent working condition.", start_price: 2500, reserve_price: 2750 },
        { title: "Vinyl Record", description: "Original pressing 1977 of Rumours by Fleetwood Mac.", start_price: 250, reserve_price: 300 },
        { title: "Antique Clock", description: "18th century wall clock.", start_price: 600, reserve_price: 800 },
        { title: "Art Sculpture", description: "Replica abstract sculpture by Len Lye", start_price: 1500, reserve_price: 2500 },
        { title: "Signed Sports Memorabilia", description: "Basketball signed by Michael Jordan.", start_price: 2500, reserve_price: 5000 },
        { title: "First Edition Classic Book", description: "First edition of 'To Kill a Mockingbird'.", start_price: 800, reserve_price: 1600 },
        { title: "Coin Collection", description: "Set of rare silver coins from the Roman Empire.", start_price: 1200, reserve_price: 2400 },
        { title: "Vintage Wine Bottle", description: "Bottle of wine from 1920s.", start_price: 700, reserve_price: 1400 },
        { title: "Luxury Watch", description: "1950 Vinatge Rolex Oyster", start_price: 3000, reserve_price: 6000 },
        { title: "Designer Handbag", description: "Limited edition handbag by a famous fashion designer.", start_price: 1100, reserve_price: 2200 }
    ];

    try {
        const result = await AuctionItem.insertMany(auctionItems);
        console.log(`${result.length} items have been successfully seeded.`);
        return result;
    } catch (error) {
        console.error('Error seeding auction items:', error);
        throw error;
    } finally {
        await mongoose.connection.close();
    }
};



