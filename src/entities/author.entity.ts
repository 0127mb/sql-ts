import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Book} from "./book.entity";
import {Category} from "./category.entity";

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
}
