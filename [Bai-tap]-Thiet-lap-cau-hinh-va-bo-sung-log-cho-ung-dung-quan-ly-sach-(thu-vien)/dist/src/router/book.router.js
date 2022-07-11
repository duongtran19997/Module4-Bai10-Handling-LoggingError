"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const book_model_1 = require("../schema/book.model");
const author_model_1 = require("../schema/author.model");
const publisher_model_1 = require("../schema/publisher.model");
const winston_1 = require("../logger/winston");
const upload = (0, multer_1.default)();
const router = express_1.default.Router();
exports.router = router;
router.get('/create', upload.none(), (req, res) => {
    res.render('create');
});
router.post('/create', upload.none(), async (req, res) => {
    try {
        const Author = new author_model_1.author({ name: req.body.author });
        const Publisher = new publisher_model_1.publisher({ name: req.body.publisher });
        const Book = new book_model_1.book({
            name: req.body.name,
            author: Author._id,
            publisher: Publisher._id
        });
        await Publisher.save();
        await Author.save();
        await Book.save();
        res.json('success');
    }
    catch (err) {
        winston_1.logger.error(err);
    }
});
router.get('/list', upload.none(), async (req, res) => {
    let query = {};
    if (req.query.author) {
        let authorFind = req.query.author || "";
        let Author = await author_model_1.author.findOne({ name: { $regex: authorFind } });
        query = {
            author: Author
        };
    }
    const listBook = await book_model_1.book.find(query).populate('author', 'name').populate('publisher', 'name');
    res.render('listBook', { listBook: listBook });
});
//# sourceMappingURL=book.router.js.map