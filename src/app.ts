import express from 'express';
import mongoose from 'mongoose';


const app = express();
const {PORT = 3000} = process.env;


const connect = async () => {
    mongoose.set('strictQuery', true);
    await mongoose.connect('mongodb://localhost:27017/MestoDb')
    await app.listen(PORT);
    console.log('успешно');
};

connect();
