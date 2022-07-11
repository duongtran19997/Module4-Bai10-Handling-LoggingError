"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.author = void 0;
const mongoose_1 = require("mongoose");
const authorSchema = new mongoose_1.Schema({
    name: String
});
const author = (0, mongoose_1.model)('author', authorSchema);
exports.author = author;
//# sourceMappingURL=author.model.js.map