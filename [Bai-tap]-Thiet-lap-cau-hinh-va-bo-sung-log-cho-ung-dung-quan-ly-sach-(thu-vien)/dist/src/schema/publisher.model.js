"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publisher = void 0;
const mongoose_1 = require("mongoose");
const publisherSchema = new mongoose_1.Schema({
    name: String
});
const publisher = (0, mongoose_1.model)('publisher', publisherSchema);
exports.publisher = publisher;
//# sourceMappingURL=publisher.model.js.map