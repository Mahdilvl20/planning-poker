import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "src/users/entities/user.entity";

@Entity('rooms')
export class Room {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'varchar', length: 100})
    name: string;

    @Column({default: true})
    isActive: boolean;

    @CreateDateColumn({type:'timestamp with time zone'})
    createdAt: Date;

    @ManyToOne(()=>User,(user)=>user.CreatedRooms)
    creator: User;
}
