import {Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import {Room} from './entities/room.entity';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {User} from "src/users/entities/user.entity";

@Injectable()
export class RoomsService {
  constructor(
      @InjectRepository(Room)
      private roomRepository: Repository<Room>,
      @InjectRepository(User)
      private userRepository: Repository<User>,
  ) {}

    async createRoom(name:string,creatorPayLoad:{userId:number}) {


      const creator= await this.userRepository.findOne({
          where:{id:creatorPayLoad.userId}
      });

      if(!creator){
          throw new UnauthorizedException("User not found");
      }
      const room=this.roomRepository.create({
          name,creator,
      })
        if(!room.name) throw new NotFoundException("Room not found");
      return this.roomRepository.save(room);
    }


    async findById(id:string): Promise<Room | null> {
      return this.roomRepository.findOne({
          where:{id},

      });
    }

    async findAllActive(){
      return this.roomRepository.find({
          where:{isActive:true},
      });
    }

    async deactivateRoom(id: string): Promise<void> {
        console.log('deactivateRoom input:', { id });
        const result = await this.roomRepository.update(
            { id, isActive: true },
            { isActive: false }
        );
        console.log("deactivated room", result);
        if (result.affected === 0) {
            throw new NotFoundException(`Room with ID "${id}" not found or already deactivated`);
        }
    }
}
