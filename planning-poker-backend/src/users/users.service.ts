import { Injectable } from '@nestjs/common';
import {Repository} from "typeorm";
import {User} from "src/users/entities/user.entity";
import {InjectRepository} from "@nestjs/typeorm";

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
        const user=this.userRepository.create({name, email, password});
        return this.userRepository.save(user);
    }

}
