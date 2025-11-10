import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Res, Req} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import {AuthGuard} from "@nestjs/passport";
import {JwtAuthGuard} from "src/auth/guards/jwt-auth.guard";

interface AuthRequest extends Request {
    user:any
}
@Controller('rooms')
@UseGuards(JwtAuthGuard)
export class RoomsController {
  constructor(private roomsService: RoomsService) {}

    @Post()

    async create(@Body('name') name:string,@Req() req:AuthRequest) {
      const creator=req.user;
      return this.roomsService.createRoom(name, creator);
    }

    @Get()
    async findAll(){
      return this.roomsService.findAllActive();
    }

    @Patch(':id/deactivate')
    async deactivate(@Param('id') id:string,@Req() req:AuthRequest){
        console.log('Controller reached, id:', id);
      return this.roomsService.deactivateRoom(id);
    }
}
