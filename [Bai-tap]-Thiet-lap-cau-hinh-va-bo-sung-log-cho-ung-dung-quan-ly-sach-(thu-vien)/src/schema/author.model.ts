import {Schema, model} from "mongoose";


const authorSchema = new Schema({
    name:String
})
const author = model('author', authorSchema);

export  {author}