import mongoose from "mongoose";
import express from "express";
import bodyParser from "body-parser";
import {router} from "./src/router/book.router";
import session from "express-session";
import passport from "./src/middleware/passport";
import auth from "./src/middleware/auth";
import authRouter from './src/router/authRouter';
import { logger } from "./src/logger/winston";
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views','./src/views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const URL = 'mongodb+srv://root:Password@cluster0.l1wd2.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(URL).then(() => {
    console.log(`DB connection established`)
}).catch(err => {
    logger.error(err)
});
app.use(session({
    secret: 'SECRET',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/book',auth.autoCheck,router)
app.use('/auth',authRouter);

app.listen(PORT,()=>{
    console.log(`listening on ${PORT}`);
});