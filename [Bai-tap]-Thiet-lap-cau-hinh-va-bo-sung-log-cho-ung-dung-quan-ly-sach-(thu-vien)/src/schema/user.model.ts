import {Schema,model} from "mongoose";

const userSchema = new Schema({
    username:String,
    password:String,
    google: {id: {type: String}}
})
const user = model('User', userSchema)

export  {user}