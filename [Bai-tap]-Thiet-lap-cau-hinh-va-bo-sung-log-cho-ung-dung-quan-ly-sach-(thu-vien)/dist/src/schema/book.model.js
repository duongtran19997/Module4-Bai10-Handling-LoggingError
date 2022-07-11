"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.book = void 0;
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    name: String,
    author: { type: mongoose_1.Schema.Types.ObjectId, ref: "author" },
    publisher: { type: mongoose_1.Schema.Types.ObjectId, ref: "publisher" },
});
const book = (0, mongoose_1.model)('Book', bookSchema);
exports.book = book;
//# sourceMappingURL=book.model.js.map