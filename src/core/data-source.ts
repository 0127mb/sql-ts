import 'reflect-metadata'
import {DataSource} from "typeorm"
import {Book} from "../entities/book.entity";
import {Author} from "../entities/author.entity";
import {CourseEntity} from "../entities/course.entity";
import {Cart} from "../Features/Cart/entites/Cart.entity";

import {Category} from "../entities/category.entity";
import {Language} from "../Features/languages/entities/language.entity";
import {Favorite} from "../Features/favorites/entities/favorite.entity";
import {User} from "../auth/entites/User.entity";
export const AppDataSource = new DataSource({
    type: "postgres",
    url: process.env.DB_URL,
    entities: [Book, Author, CourseEntity,Cart,Category,Language,Favorite,User],
    synchronize: true,
    logging: true
})
