"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const data_source_1 = require("./core/data-source");
const Book_controller_1 = require("./Features/Libary/Book.controller");
const Author_controller_1 = require("./Features/Libary/Author.controller");
const Course_controller_1 = require("./Features/Libary/Course.controller");
const upload_cantroller_1 = require("./Features/Middileware/cantrollers/upload.cantroller");
const swagger_1 = require("./swagger");
const Language_controller_1 = require("./Features/Libary/Language.controller");
const Category_controller_1 = require("./Features/Libary/Category.controller");
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Swagger Documentation
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.swaggerSpec, {
    customCss: '.swagger-ui .topbar { display: none }',
    swaggerOptions: {
        persistAuthorization: true,
    },
}));
data_source_1.AppDataSource.initialize()
    .then(() => {
    console.log('Data connected');
    app.use("/authors", Author_controller_1.authorrouter);
    app.use("/books", Book_controller_1.Bookrouter);
    app.use('/course', Course_controller_1.Courserouter);
    app.use("/upload", upload_cantroller_1.uploadRouter);
    app.use("/language", Language_controller_1.Languagerauter);
    app.use("/category", Category_controller_1.CategoryRouter);
    app.listen(5000, () => {
        console.log("Server is listening on port 5000");
        console.log("Swagger documentation available at http://localhost:5000/api-docs");
    });
})
    .catch((err) => {
    console.error('Database did not connect', err);
});
//# sourceMappingURL=main.js.map