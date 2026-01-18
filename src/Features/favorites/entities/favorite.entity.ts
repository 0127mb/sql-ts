import {BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../../Users/entities/User.entity";
@Entity("Favorite")
export class Favorite extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;
    @OneToOne(()=> User,user => user.favorite)
    user:User
    @Column()
    is_liked:boolean;
    @Column()
    count:number;

}