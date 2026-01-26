import 'dotenv/config';
import 'reflect-metadata';
import express, {Request, Response} from 'express';
import swaggerUi from 'swagger-ui-express';
import {AppDataSource} from './core/data-source';
import {Bookrouter} from "./Features/Libary/Book.controller";
import {authorrouter} from "./Features/Libary/Author.controller";
import {Courserouter} from "./Features/Libary/Course.controller";
import {uploadRouter} from "./Features/Middileware/cantrollers/upload.cantroller";
import {swaggerSpec} from "./swagger";
import {Languagerauter} from "./Features/Libary/Language.controller";
import {Category} from "./entities/category.entity";
import {CategoryRouter} from "./Features/Libary/Category.controller";
import {AuthRouter} from "./auth/Controllers/auth.controller";

const app = express();
app.use(express.json());

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customCss: '.swagger-ui .topbar { display: none }',
    swaggerOptions: {
        persistAuthorization: true,
    },
}));

AppDataSource.initialize()
    .then(() => {
        console.log('Data connected');


        app.use("/authors", authorrouter);
        app.use("/books", Bookrouter);
        app.use('/course', Courserouter)
        app.use("/upload", uploadRouter)
        app.use("/language", Languagerauter)
        app.use("/category", CategoryRouter)
        app.use("/auth", AuthRouter)
        app.listen(5000, () => {
            console.log("Server is listening on port 5000");
            console.log("Swagger documentation available at http://localhost:5000/api-docs");
        });
    })
    .catch((err) => {
        console.error('Database did not connect', err);
    });
