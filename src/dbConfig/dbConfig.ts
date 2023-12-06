import mongoose from "mongoose";

export const connect = async () => {
    try {
        mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URL!);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log("Mongo db connected")
        })

        connection.on('error', (err) => {
            console.log("Please check mongo db is running", err);
            process.exit();
        })

    } catch (error) {
        console.log("Connection failed!!", error)
    }
} 