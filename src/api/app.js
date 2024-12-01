import express from 'express';
import mongoose from 'mongoose';
import next from 'next';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './src/routers/userRouter.js';
import brandRoutes from './src/routers/brandRouter.js';
import productRoutes from './src/routers/productRouter.js';
import billRoutes from './src/routers/billRouter.js';

dotenv.config();

const app = express();
app.use(cors());
const server = http.createServer(app);

app.use(express.json());
app.use('/user', userRoutes);
app.use('/brand', brandRoutes);
app.use('/bill', billRoutes);
app.use('/product', productRoutes);

mongoose.connect(process.env.DB_URL)
    .then(() => console.log('MongoDB connected'))
    .catch(error => console.error('MongoDB connection error:', error));


const PORT = process.env.APPLICATION_PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
