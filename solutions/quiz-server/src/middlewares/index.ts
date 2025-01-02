import mongoose from 'mongoose';
import { Request, Response, NextFunction } from 'express';

const connectMongo = async () => {
  try {
    if (!mongoose.connection.readyState) {
      await mongoose.connect(process.env.MONGODB_URI as string);
      console.log('MongoDB connected');
    }
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

export default connectMongo;
