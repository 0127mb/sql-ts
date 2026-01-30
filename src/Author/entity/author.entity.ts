import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Book} from "../../Book/entity/book.entity";
import {Category} from "../../Category/entity/category.entity";
import {CourseEntity} from "../../course/entities/course.entity";

@Entity("Author")
export class Author extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({nullable: true})
    authorId: number;
    @Column()
    name: string;
    @Column({nullable: true})
    image: string;
    @OneToMany(()=> Category, (category) => category.Author,)
    category: Category[];
    @OneToMany(() => Book, book => book.author)
    books: Book[];
    @OneToMany(()=> CourseEntity,course => course.author)
    courses: CourseEntity[];
}
