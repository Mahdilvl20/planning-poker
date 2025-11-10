import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import {UsersService} from "src/users/users.service";

@Controller('auth')
export class AuthController {
  constructor(
      private authService: AuthService,
      private usersService: UsersService,
  ) {}
    @Post('register')
    async register(@Body() body:{name: string, email: string, password: string}) {
      const user=await this.usersService.createUser(body.name, body.email, body.password);
      const {password,...result}=user;
      return result;
    }
    @Post('login')
    async login(@Body() body:{name: string, email: string, password: string}) {
      const user=await this.authService.Login(body.email);
      if(!user) return {error:'invalid email'};
    }
}
