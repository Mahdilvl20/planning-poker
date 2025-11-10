import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import * as argon2 from 'argon2';
import {UsersService} from "src/users/users.service";
import {JwtService} from "@nestjs/jwt";
@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}
    async validateUser(email:string,password:string){
        const user=await this.usersService.findByEmail(email);
        if (user && await argon2.verify(user.password,password)){
            const {password,...result}=user;
            return result;
        }
        return null;
    }
    async Login(user:any){
        const payload={sub:user.id,name:user.name,email:user.email};
        return {access_token:this.jwtService.sign(payload),
        expires_in:3600,
        token_type:'Bearer',};
    }
}
