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


    async findById(slug:string) {
        if (!slug) return null;
        return this.roomRepository.findOne({
          where:{slug:slug},
      });
    }

    async findAllActive(){
      return this.roomRepository.find({
          where:{isActive:true},
      });
    }



}
