import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

//const uri = process.env.DB_URL;
const client = new MongoClient('mongodb://localhost:27017/pos');

async function run() {
    try {
        await client.connect();
        const database = client.db('pos');
        const users = database.collection('users');
        const products = database.collection('products');
        const bills = database.collection('bills');
        const brands = database.collection('brands');

        // Insert users
        await users.insertMany([
            { username: 'admin', password: '1234567890', type: 'admin' },
            { username: 'user', password: '1234567890', type: 'user' }
        ]);

        // Insert products
        await products.insertMany([
            { name: 'Laptop', brand: 'Brand A', price: 1000, stock: 50 },
            { name: 'Smartphone', brand: 'Brand B',price: 500,stock: 100 },
            { name: 'Tablet', brand: 'Brand C', price: 300, stock: 200 }
        ]);

        await brands.insertMany([
            { brandName: 'Brand A', brandAgentEmail: 'brandA@mail.com', brandContact: '1234567890'},
            { brandName: 'Brand B', brandAgentEmail: 'brandB@mail.com', brandContact: '1234567890'},
            { brandName: 'Brand C', brandAgentEmail: 'brandC@mail.com', brandContact: '1234567890'}
        ]);

        // Insert bills
        await bills.insertMany([
            {
                userId: 'user2',
                items: [
                    { productId: 'product1', content: 'Laptop', price: 1000 },
                    { productId: 'product2', content: 'Smartphone', price: 500 }
                ],
                total: 1500,
                date: new Date('2023-07-16')
            },
            {
                userId: 'user2',
                items: [
                    { productId: 'product2', content: 'Smartphone', price: 500 },
                    { productId: 'product3', content: 'Tablet', price: 300 }
                ],
                total: 800,
                date: new Date('2023-07-17')
            }
        ]);

        console.log('Data inserted successfully');
    } finally {
        await client.close();
    }
}

run().catch(console.dir);
