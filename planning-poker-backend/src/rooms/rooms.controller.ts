import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Res, Req} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import {AuthGuard} from "@nestjs/passport";
import {JwtAuthGuard} from "src/auth/guards/jwt-auth.guard";
import {Request} from "express";

interface AuthRequest extends Request {
    user:{userId:number,email:string,name:string};
}
@Controller('rooms')
@UseGuards(JwtAuthGuard)
export class RoomsController {
  constructor(private roomsService: RoomsService) {}

    @Post()
    async create(@Body('name') name: string, @Req() req: AuthRequest) {
        const room = await this.roomsService.createRoom(name, req.user);

        const forwarded = req.get('X-Forwarded-Proto');
        const protocol = forwarded ? forwarded.split(',')[0] : (req.protocol || 'http');
        const host = req.get('host') || 'localhost:3000';
        const baseUrl = `${protocol}://${host}`;
        const shortLink = `${baseUrl}/room/${room.slug}`;
        return {
            id: room.id,
            name: room.name,
            link: shortLink,
            slug: room.slug,
        };
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
