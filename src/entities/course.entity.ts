import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";


@Entity('courses')
export class  CourseEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number;
    @Column({length:128})
    title:string;
    @Column({length:15})
    full_name:string;
    @Column({nullable:true})
    discount:string;
    @Column({nullable:true})
    price_now:string;
    @Column()
    category:string;
    @Column()
    about:string;
    @Column()
    way:string;
}