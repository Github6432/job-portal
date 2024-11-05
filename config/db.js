import mongoose from "mongoose";
import "colors"

let isConnected = false; // Track connection status
const connectdb = async () => {
    if (isConnected) {
        console.log("Already connected to MongoDB.");
        return;
    }
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        isConnected = conn.connections[0].readyState === 1;
        console.log(`Connected To MongoDB Database ${conn.connection.host}`.green.bgBlue)
    } catch (error) {
        console.log(`ERROR IN MONGO_DB ${error}`.black.bgRed)
    }
}

export default connectdb;
