import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    Res,
    Req,
    HttpException,
    HttpStatus, BadRequestException
} from '@nestjs/common';
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
        const host = req.get('') || process.env.APP_URL;
        const baseUrl = `${protocol}://${host}`;
        const shortLink = `${baseUrl}/room/${room.slug}`;
        return {
            id: room.id,
            name: room.name,
            link: shortLink,
            slug: room.slug,
        };
    }
    @Post('/findroom')
    async roomValidate(@Body('link') link: string, @Req() req: AuthRequest) {
        if (!link) {
            throw new BadRequestException('Invalid link');
        }
      const searchRoom= await this.roomsService.findById(link);
      if (!searchRoom) {

         throw new BadRequestException('Not Found');
      }
      return searchRoom;
    }

    @Get('/get')
    async findAll(){
      return this.roomsService.findAllActive();
    }

}
