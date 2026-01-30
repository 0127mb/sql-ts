import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Book} from "../../Book/entity/book.entity";
import {User} from "../../auth/entites/User.entity";

@Entity("reviews")
export class Reviews extends BaseEntity {
    @PrimaryGeneratedColumn() id: number;
    @ManyToOne(() => Book, book => book.reviews) book: Book;
    @ManyToOne(() => User, user => user.reviews) user: User;
    @Column({nullable: true})
    Comment?: string
    @Column({nullable: true})
    grade?: number;
    @Column({nullable: true})
    user_full_name?: string;
    @Column({nullable: true})
    user_email?: string;
    @Column({nullable: true})
    user_number?: number;
    @Column({nullable: true})
    user_password?: string;
}

