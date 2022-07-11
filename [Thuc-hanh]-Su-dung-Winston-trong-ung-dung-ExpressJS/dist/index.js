"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const winston_1 = require("./src/logger/winston");
const app = (0, express_1.default)();
const PORT = 3000;
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    try {
        res.end("<h1>Hello winston!</h1>");
        throw new Error("Error test winston");
    }
    catch (err) {
        winston_1.logger.error(err);
    }
});
app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});
//# sourceMappingURL=index.js.map