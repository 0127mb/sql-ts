import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Role} from "../../core/constns/enum";
import {Reviews} from "../../Features/review/review.entity";

@Entity("User")
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id?: number;
    @Column({unique: true, length: 30})
    email!: string;
    @Column({unique: true, length: 30,nullable: true})
    full_name?: string;
    @Column({type: "varchar", length: 20, unique: true, nullable: true})
    phoneNumber!: string;
    @Column({unique: true, length: 128})
    password!: string;
    @Column({length: 30, nullable: true})
    image?: string;
    @Column({type: "enum", enum: Role, default: Role.User, nullable: true})
    role?: Role;
    @OneToMany(() => Reviews, reviews => reviews.user)
    reviews: Reviews;

}