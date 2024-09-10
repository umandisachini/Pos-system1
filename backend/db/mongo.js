/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/

// Select the database to use.
use('pos');

// Insert a few documents into the users collection.
db.getCollection('users').insertMany([
  { username: 'admin', password: '1234567890',type: 'admin' },
  { username: 'user', password: '1234567890', type: 'user' }
]);

// Insert a few documents into the products collection.
db.getCollection('products').insertMany([
  { name: 'Laptop', brand: 'Brand A', price: 1000, description: 'High performance laptop', stock: 50 },
  { name: 'Smartphone', brand: 'Brand B', category: 'Electronics', price: 500, description: 'Latest model smartphone', stock: 100 },
  { name: 'Tablet', brand: 'Brand C', category: 'Electronics', price: 300, description: '10 inch display tablet', stock: 200 }
]);

db.getCollection('brands').insertMany([
  { brandID: 'brand1', brandName: 'Brand A', brandAgentEmail: 'brandA@mail.com', brandContact: '1234567890'},
  { brandID: 'brand2', brandName: 'Brand B', brandAgentEmail: 'brandB@mail.com', brandContact: '1234567890'},
  { brandID: 'brand3', brandName: 'Brand C', brandAgentEmail: 'brandC@mail.com', brandContact: '1234567890'}
]);

// Insert a few documents into the bills collection.
db.getCollection('bills').insertMany([
  {
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

// Run a find command to view items sold on July 16th, 2023.
const salesOnJuly16th = db.getCollection('bills').find({
  date: { $gte: new Date('2023-07-16'), $lt: new Date('2023-07-17') }
}).count();

// Print a message to the output window.
console.log(`${salesOnJuly16th} sales occurred on July 16th, 2023.`);

// Here we run an aggregation and open a cursor to the results.
// Use '.toArray()' to exhaust the cursor to return the whole result set.
// You can use '.hasNext()/.next()' to iterate through the cursor page by page.
const salesIn2023 = db.getCollection('bills').aggregate([
  // Find all of the sales that occurred in 2023.
  { $match: { date: { $gte: new Date('2023-01-01'), $lt: new Date('2024-01-01') } } },
  // Group the total sales for each product.
  { $group: { _id: '$items.productId', totalSaleAmount: { $sum: { $multiply: [ '$items.price', 1 ] } } } }
]).toArray();

console.log(salesIn2023);
