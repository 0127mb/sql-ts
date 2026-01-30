"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
require("dotenv/config");
const dotenv = __importStar(require("dotenv"));
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const data_source_1 = require("./core/data-source");
const Book_controller_1 = require("./Book/cotroller/Book.controller");
const Author_controller_1 = require("./Author/controller/Author.controller");
const Course_controller_1 = require("./course/controller/Course.controller");
const upload_cantroller_1 = require("./Features/Middileware/cantrollers/upload.cantroller");
const swagger_1 = require("./swagger");
const Language_controller_1 = require("./Features/languages/controller/Language.controller");
const Category_controller_1 = require("./Category/controller/Category.controller");
const auth_controller_1 = require("./auth/Controllers/auth.controller");
const path = __importStar(require("path"));
const Book_review_controller_1 = require("./Features/review/controller/Book.review.controller");
const Level_controller_1 = require("./Features/difficulty/controller/Level.controller");
const app = (0, express_1.default)();
dotenv.config();
console.log("Loaded SECRET_KEY:", process.env.SECRET_KEY);
app.use(express_1.default.json());
// Swagger Documentation
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.swaggerSpec, {
    customCss: '.swagger-ui .topbar { display: none }',
    swaggerOptions: {
        persistAuthorization: true,
    },
}));
dotenv.config({ path: path.resolve(__dirname, "../.env") });
data_source_1.AppDataSource.initialize()
    .then(() => {
    console.log('Data connected');
    app.use("/authors", Author_controller_1.authorrouter);
    app.use("/books", Book_controller_1.Bookrouter);
    app.use('/course', Course_controller_1.Courserouter);
    app.use("/upload", upload_cantroller_1.uploadRouter);
    app.use('/level', Level_controller_1.LevelRouter);
    app.use("/language", Language_controller_1.Languagerauter);
    app.use("/category", Category_controller_1.CategoryRouter);
    app.use("/api/review", Book_review_controller_1.BookReviewController);
    app.use("/auth", auth_controller_1.AuthRouter);
    app.listen(5000, () => {
        console.log("Server is listening on port 5000");
        console.log("Swagger documentation available at http://localhost:5000/api-docs");
    });
    console.log("ENV TEST:", process.env.DB_HOST);
})
    .catch((err) => {
    console.error('Database did not connect', err);
});
//# sourceMappingURL=main.js.map