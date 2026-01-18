import {BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Book} from "../../../entities/book.entity";


@Entity(
    'Cart',
)
export class Cart extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    is_active: boolean;
    @OneToOne(() => Book, book => book.cart)
    book:Book;
}