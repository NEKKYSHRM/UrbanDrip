import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if(!MONGODB_URI) {
    throw new Error("Please define mongodb uri in .env file");
}

let isConnected = false;

export async function dbconnect() {
    if(isConnected) {
        console.log("Using existing database");
    }

    try {
        const connection = await mongoose.connect(MONGODB_URI);
        isConnected = true;
        console.log("Database connected succesfully: ", connection.connection.host);        
    } catch (error) {
        console.error("Database connection failed", error);
        process.exit(1);        
    }
}