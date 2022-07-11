import mongoose from "mongoose";
import express from "express";
import multer from 'multer';
import {book} from "../schema/book.model";
import {author} from "../schema/author.model";
import {publisher} from "../schema/publisher.model";

const upload = multer();
const router = express.Router();

router.get('/create', upload.none(), (req, res) => {
    res.render('create')
});

router.post('/create', upload.none(), async (req, res) => {
    try {
        const Author = new author({name: req.body.author});
        const Publisher = new publisher({name: req.body.publisher});
        const Book = new book({
            name: req.body.name,
            author: Author._id,
            publisher: Publisher._id
        });
        await Publisher.save();
        await Author.save();
        await Book.save();

        res.json('success')
    }catch (err) {
        console.log(err);
    }
});


router.get('/list', upload.none(), async (req, res) => {
    let query = {};
    if (req.query.author) {
        let authorFind = req.query.author || "";

        let Author = await author.findOne({name: {$regex: authorFind}})

        query = {
            author: Author
        }
    }
    const listBook = await book.find(query).populate('author', 'name').populate('publisher', 'name')
    res.render('listBook', {listBook: listBook});
});


export {router};
