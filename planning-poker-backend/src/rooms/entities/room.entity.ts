import {BeforeInsert, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "src/users/entities/user.entity";
import {customAlphabet} from "nanoid";
const nanoid=customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 10)
@Entity('rooms')
export class Room {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({type: 'varchar', length: 100})
    name: string;

    @Column({default: true})
    isActive: boolean;

    @CreateDateColumn({type:'timestamp with time zone'})
    createdAt: Date;

    @ManyToOne(()=>User,(user)=>user.createdRooms)
    creator: User;

    @Column({unique:true,nullable:true})
    slug:string;

    @BeforeInsert()
    generateSlug(){
        this.slug=nanoid();
    }
}
