import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {User} from "src/users/entities/user.entity";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

    @Post('register')
    async register(@Body()dto:CreateUserDto) {
      return this.usersService.createUser(dto.name,dto.email,dto.password);
    }
  }

