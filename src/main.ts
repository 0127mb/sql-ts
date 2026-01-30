import 'dotenv/config'
import 'dotenv/config'
import * as dotenv from 'dotenv';
import 'reflect-metadata';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import {AppDataSource} from './core/data-source';
import {Bookrouter} from "./Book/cotroller/Book.controller";
import {authorrouter} from "./Author/controller/Author.controller";
import {Courserouter} from "./course/controller/Course.controller";
import {uploadRouter} from "./Features/Middileware/cantrollers/upload.cantroller";
import {swaggerSpec} from "./swagger";
import {Languagerauter} from "./Features/languages/controller/Language.controller";
import {CategoryRouter} from "./Category/controller/Category.controller";
import {AuthRouter} from "./auth/Controllers/auth.controller";
import * as path from "path";
import {BookReviewController} from "./Features/review/controller/Book.review.controller";
import {LevelRouter} from "./Features/difficulty/controller/Level.controller";

const app = express();

dotenv.config()
console.log("Loaded SECRET_KEY:", process.env.SECRET_KEY);
app.use(express.json());
// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customCss: '.swagger-ui .topbar { display: none }',
    swaggerOptions: {
        persistAuthorization: true,
    },
}));
dotenv.config({path: path.resolve(__dirname, "../.env")});
AppDataSource.initialize()
    .then(() => {
        console.log('Data connected');


        app.use("/authors", authorrouter);
        app.use("/books", Bookrouter);
        app.use('/course', Courserouter)
        app.use("/upload", uploadRouter)
        app.use('/level', LevelRouter);

        app.use("/language", Languagerauter)
        app.use("/category", CategoryRouter)
        app.use("/api/review", BookReviewController)
        app.use("/auth", AuthRouter)
        app.listen(5000, () => {
            console.log("Server is listening on port 5000");
            console.log("Swagger documentation available at http://localhost:5000/api-docs");
        });
        console.log("ENV TEST:", process.env.DB_HOST);

    })
    .catch((err) => {
        console.error('Database did not connect', err);
    });
