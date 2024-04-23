import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });
//passing path because the .env file is not present in the root folder

const connectDB = async () => {
    try {
        await mongoose.connect(
            process.env.MONGO_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true, 
            }
        )
        console.log(`\n\t\t\t-----------------------------------------Database Connected!------------------------------------\n`);
    } catch (err) {
        console.log(err.message);
        process.exit(1);
    }
}

export default connectDB;

