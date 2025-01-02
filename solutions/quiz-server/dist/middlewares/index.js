"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectMongo = async () => {
    try {
        if (!mongoose_1.default.connection.readyState) {
            await mongoose_1.default.connect(process.env.MONGODB_URI);
            console.log('MongoDB connected');
        }
    }
    catch (error) {
        console.error('MongoDB connection error:', error);
    }
};
exports.default = connectMongo;
