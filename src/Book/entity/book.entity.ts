import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    BaseEntity,
    ManyToMany,
    OneToOne,
    OneToMany
} from "typeorm";
import { Author } from "../../Author/entity/author.entity";
import { Language } from "../../Features/languages/entities/language.entity";

import { Category } from "../../Category/entity/category.entity";
import {Reviews} from "../../Features/review/review.entity";

@Entity("books")
export class Book extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 128, nullable: true })
    title: string;

    @ManyToMany(() => Language, language => language.book)
    languages: Language[];

    // @OneToOne(() => Cart, cart => cart.book)
    // cart: Cart;

    @Column({ length: 24, nullable: true })
    discount: string;

    @Column({ length: 24 })
    price_now: string;
    @Column({ nullable: true })
    image: string;
    @ManyToMany(() => Category, category => category.book, {nullable: true})
    category: Category[];


    @ManyToOne(() => Author, author => author.books, { onDelete: "CASCADE" })
    @JoinColumn({ name: "authorId" })   
    author: Author;
    @OneToMany(()=>Reviews, reviews => reviews.book)
    reviews: Reviews[];
}
