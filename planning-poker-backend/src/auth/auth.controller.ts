import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import {UsersService} from "src/users/users.service";
import {CreateUserDto} from "src/users/dto/create-user.dto";
import {LoginDto} from "src/users/dto/login.dto";

@Controller('auth')
export class AuthController {
  constructor(
      private authService: AuthService,
      private usersService: UsersService,
  ) {}
    @Post('register')
    async register(@Body() createUserDto: CreateUserDto) {
      if(!createUserDto.name || !createUserDto.email || !createUserDto.password){
          return {error:'all fields are required'}
      }

      const user=await this.usersService.createUser(createUserDto.name,createUserDto.email,createUserDto.password);
      const {password,...result}=user;
      return result;
    }
    @Post('login')
    async login(@Body() loginDto: LoginDto) {
      if(!loginDto.email || !loginDto.password){
          return {error:'all fields are required'}
      }
      const user=await this.authService.validateUser(loginDto.email,loginDto.password);
      if(!user) return {error:'invalid email'};
      return this.authService.Login(user);
    }
}
