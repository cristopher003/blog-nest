import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Post {

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column('text',{unique:true})
    title:string;
    
    @Column('text',{default:0})
    content:string;

    @Column("text",{nullable:true})
    autor:string;
    
    @Column("date",{unique:true})
    publicationDate:Date;

    @Column("text",
    {array:true,default:[]})
    tags:string[];

    @Column("text",
    {array:true,default:[]})
    categories:string[];


}
