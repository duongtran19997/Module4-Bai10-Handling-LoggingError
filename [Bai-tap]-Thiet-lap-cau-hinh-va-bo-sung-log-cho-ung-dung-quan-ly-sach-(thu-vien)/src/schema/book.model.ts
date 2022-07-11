import {Schema,model} from "mongoose";

const bookSchema = new Schema({
    name:String,
    author: {type:Schema.Types.ObjectId,ref:"author"},
    publisher: {type:Schema.Types.ObjectId,ref:"publisher"},
});

const book = model('Book', bookSchema);

export {book};