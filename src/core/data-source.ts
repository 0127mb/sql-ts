import 'reflect-metadata'
import {DataSource} from "typeorm"
import {Book} from "../entities/book.entity";
import {Author} from "../entities/author.entity";
import {CourseEntity} from "../entities/course.entity";
import {Cart} from "../Features/Cart/entites/Cart.entity";
import {User} from "../Features/Users/entities/User.entity";
import {Category} from "../entities/category.entity";
import {Language} from "../Features/languages/entities/language.entity";
import {Favorite} from "../Features/favorites/entities/favorite.entity";
export const AppDataSource = new DataSource({
    type: "postgres",
    url: process.env.DB_URL,
    entities: [Book, Author, CourseEntity,Cart,User,Category,Language,Favorite],
    synchronize: true,
    logging: true
})
