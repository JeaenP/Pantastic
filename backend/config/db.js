import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://jeaen:jp2583462@cluster0.fokiihc.mongodb.net/food-del').then(()=>console.log("DB connected"))
}