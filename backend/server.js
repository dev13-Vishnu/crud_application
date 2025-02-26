import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js'
import path from 'path'

dotenv.config();

connectDB();

const app = express();
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use('/uploads', express.static(path.join(path.resolve(),'uploads')));

app.use('/api/users', userRoutes)
app.get('/', (req, res) => res.send('API is running...'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))