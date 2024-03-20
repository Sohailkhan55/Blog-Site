import {Schema, model} from 'mongoose';

export const postSchema = new Schema ({
    title : String,
    content : String,
    createdAt:{
        type : Date,
        default : Date.now
    }
});

export const PostModel = model('Post',postSchema);