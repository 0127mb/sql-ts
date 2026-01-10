"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const data_source_1 = require("./core/data-source");
const Book_controller_1 = require("./Features/Libary/Book.controller");
const Author_controller_1 = require("./Features/Libary/Author.controller");
const Course_controller_1 = require("./Features/Libary/Course.controller");
const app = (0, express_1.default)();
app.use(express_1.default.json());
data_source_1.AppDataSource.initialize()
    .then(() => {
    console.log('Data connected');
    app.use("/authors", Author_controller_1.authorrouter);
    app.use("/books", Book_controller_1.Bookrouter);
    app.use('/course', Course_controller_1.Courserouter);
    app.listen(5000, () => console.log("Server is listening on port 5000"));
})
    .catch((err) => {
    console.error('Database did not connect', err);
});
