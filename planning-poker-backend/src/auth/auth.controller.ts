import {Controller, Post, Body, BadRequestException, UnauthorizedException, ConflictException} from '@nestjs/common';
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
       //   return {error:'all fields are required',code:{id:1}}
          throw new BadRequestException('Username and password are required');
      }
      const userAlready=await this.usersService.findByEmail(createUserDto.email);
      if(userAlready){

          throw new ConflictException('User already exists');
      }
      const user=await this.usersService.createUser(createUserDto.name,createUserDto.email,createUserDto.password);
      const {password,...result}=user;
      return result;
    }
    @Post('login')
    async login(@Body() loginDto: LoginDto) {
      if(!loginDto.email || !loginDto.password){
          throw new BadRequestException('all fields are required')
      }
      const user=await this.authService.validateUser(loginDto.email,loginDto.password);
      if(!user) throw new UnauthorizedException('Invalid email or password');
      return this.authService.Login(user);
    }
}
