import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import eventRoutes from './routes/eventRoutes'; 
import profileRoutes from './routes/profileRoutes'; 
import cors from 'cors';
dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

const app = express();

app.use(cors({
    origin: 'http://localhost:3000', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));


app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/auth', profileRoutes);
app.use('/api', eventRoutes); 

mongoose.connect(process.env.MONGO_URI!)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

export default app;
