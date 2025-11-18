import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from "typeorm";


@Entity('messages')
export class Message {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    roomId:string;

    @Column()
    userId:number;

    @Column()
    name: string;

    @Column('text')
    message: string;

    @CreateDateColumn()
    timestamp:Date;
}
