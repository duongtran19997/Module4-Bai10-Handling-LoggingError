import express from 'express';
import bodyParser from "body-parser";
import { logger } from "./src/logger/winston";
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    try {
        res.end("<h1>Hello winston!</h1>")
        throw new Error("Error test winston");
    } catch (err) {
        logger.error(err)
    }
})

app.listen(PORT,()=>{
    console.log(`Listening on ${PORT}`)
});