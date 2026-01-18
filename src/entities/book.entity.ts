import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BaseEntity, ManyToMany, OneToOne} from "typeorm";
import {Author} from "./author.entity";
import {Language} from "../Features/languages/entities/language.entity";
import {Cart} from "../Features/Cart/entites/Cart.entity";
import {Category} from "./category.entity";

@Entity("books")
export class Book extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 128, nullable: true })
    title: string;

    @ManyToMany(() => Language, language => language.book)
    languages: Language[];

    @OneToOne(() => Cart, cart => cart.book)
    cart: Cart;

    @Column({ length: 24, nullable: true })
    discount: string;

    @Column({ length: 24 })
    price_now: string;

    @ManyToMany( () => Category,category => category.book)
    category: Category[];


    @ManyToOne(() => Author, author => author.books, { onDelete: "CASCADE" })
    @JoinColumn({ name: "authorId" })
    author: Author;
}
