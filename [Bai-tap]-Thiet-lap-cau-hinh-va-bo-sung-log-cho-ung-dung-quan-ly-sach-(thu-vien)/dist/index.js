"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const book_router_1 = require("./src/router/book.router");
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("./src/middleware/passport"));
const auth_1 = __importDefault(require("./src/middleware/auth"));
const authRouter_1 = __importDefault(require("./src/router/authRouter"));
const app = (0, express_1.default)();
const PORT = 3000;
app.set('view engine', 'ejs');
app.set('views', './src/views');
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
const URL = 'mongodb+srv://root:Password@cluster0.l1wd2.mongodb.net/?retryWrites=true&w=majority';
mongoose_1.default.connect(URL).then(() => {
    console.log(`DB connection established`);
}).catch(err => {
    console.log(`Error connecting to MongoDB`);
});
app.use((0, express_session_1.default)({
    secret: 'SECRET',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 }
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use('/book', auth_1.default.autoCheck, book_router_1.router);
app.use('/auth', authRouter_1.default);
app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
});
//# sourceMappingURL=index.js.map