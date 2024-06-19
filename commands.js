#!/usr/bin/env node

import { program } from 'commander';
import { addAuctionItem, findAuctionItem, removeAuctionItem, updateAuctionItem, listAuctionItems, seedAuctionItems } from './index.js';
import inquirer from 'inquirer';

const questions = [
    {
        type: 'input',
        name: 'title',
        message: 'Item Name:'
    },
    {
        type: 'input',
        name: 'description',
        message: 'Item Description:'
    },
    {
        type: 'input',
        name: 'start_price',
        message: 'Start Price:',
        validate: value => {
            if (!isNaN(parseFloat(value)) && isFinite(value)) {
                return true;
            }
            return 'Please enter a valid number';
        }
    },
    {
        type: 'input',
        name: 'reserve_price',
        message: 'Reserve Price:',
        validate: value => {
            if (!isNaN(parseFloat(value)) && isFinite(value)) {
                return true;
            }
            return 'Please enter a valid number';
        }
    }
];

program
     .version('1.0.0')
     .description('Auction Item Management System')


program
     .command('add')
     .alias('a')
     .description('Add a new auction item via interactive prompts')
     .action(async () => {
         try {
             const answers = await inquirer.prompt(questions);
             await addAuctionItem({
                 title: answers.title,
                 description: answers.description,
                 start_price: parseFloat(answers.start_price),
                 reserve_price: parseFloat(answers.reserve_price)
             });
             process.exit(0); 
         } catch (err) {
             process.exit(1); 
         }
     });
 

program
    .command('find <title>')
    .alias('f')
    .description('Find an Auction Item')
    .action(title => findAuctionItem(title));

program
    .command('update <id>')
    .alias('u')
    .description('Update an existing auction item')
    .action(async (id) => {
        console.log(`Updating item with ID: ${id}`);
        const answers = await inquirer.prompt(questions);
        const updateData = {};
        Object.keys(answers).forEach(key => {
            if (answers[key] !== '') {  
                updateData[key] = answers[key];
            }
        });
        if (Object.keys(updateData).length > 0) {
            await updateAuctionItem(id, updateData);
        } else {
            console.log('No updates made.');
        }
    });

program
    .command('remove <id>')
    .alias('r')
    .description('Remove an auction item')
    .action(async (id) => {
        const confirmation = await inquirer.prompt({
            type: 'confirm',
            name: 'confirm',
            message: 'Are you sure you want to remove this item?'
        });
        if (confirmation.confirm) {
            await removeAuctionItem(id);

        } 
    });

program
    .command('list')
    .alias('l')
    .description('List all auction items')
    .action(async () => {
        try {
            const items = await listAuctionItems();
            if (items.length > 0) {
                items.forEach((item, index) => {
                    console.log(`${index + 1}: ${item.title} - $${item.start_price}`);
                });
            } else {
                console.log('No items found in the database.');
            }
        } catch (err) {
            console.error('Failed to list auction items:', err);
        }
    });

program
    .command('seed')
    .alias('s')
    .description('Seed the database with initial auction items')
    .action(async () => {
        try {
            await seedAuctionItems();
            console.log('Database has been seeded successfully.');
        } catch (err) {
            console.error('Failed to seed database:', err);
        }
    });


program.parse(process.argv);
