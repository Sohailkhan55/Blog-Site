import {connect,set} from 'mongoose';

set('strictQuery',true);

const MONGODB_URL = 'mongodb://127.0.0.1:27017';
// const client = new MongoClient(MONGODB_URL);

export const dbConnect = async () => {
    try {
        connect(MONGODB_URL)
        console.log("Database connected successfully");
    }
    catch(error)
    {
        console.log(error)
    }
}