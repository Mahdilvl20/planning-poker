import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Room} from "src/rooms/entities/room.entity";
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column({unique:true})
    email: string;
    @Column()
    password: string;
    @OneToMany(()=>Room,(room)=>room.creator)
    CreatedRooms:Room[];
}
