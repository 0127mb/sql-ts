import {BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Favorite} from "../../favorites/entities/favorite.entity";
@Entity("User")
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;
    @OneToOne(()=> Favorite,favorite=> favorite.user)
    favorite: Favorite;
    @Column()
    full_name: string;
    @Column()
    email: string;
    @Column({nullable:true})
    password?: string;
    @Column({nullable:true})
    password_confirmation?: string;
    @Column()
    phone_number!: number;

}