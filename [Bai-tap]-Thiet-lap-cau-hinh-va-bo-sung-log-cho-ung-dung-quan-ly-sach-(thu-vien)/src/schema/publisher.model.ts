import {Schema,model} from "mongoose";


const publisherSchema = new Schema({
    name: String
})
const publisher = model('publisher', publisherSchema);

export  {publisher};