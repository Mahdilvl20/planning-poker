import {HttpException, Injectable} from '@nestjs/common';
import {Repository} from "typeorm";
import {User} from "src/users/entities/user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import argon2 from "argon2";
@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}
    async findByEmail(email: string): Promise<User | undefined> {
        // @ts-ignore
        return this.userRepository.findOne({where: {email}});
    }

    async createUser(name:string,email:string,password:string){
        if(!name || !email || !password){
            throw new Error("Please enter a valid email");
        }
        const hashedPassword=await argon2.hash(password);
        const user=this.userRepository.create({name, email, password:hashedPassword});
        return this.userRepository.save(user);
    }

}
