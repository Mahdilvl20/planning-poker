import {IsEmail, IsNotEmpty, IsString, MinLength} from "class-validator";

export class CreateUserDto {
    @IsNotEmpty({message: 'name is required'})
    @IsString({message: 'name must be a string'})
    name: string;
    @IsNotEmpty({message: 'email is required'})
    @IsEmail()
    email: string;
    @IsNotEmpty({message: 'password is required'})
    @IsString({message: 'password must be a string'})
    @MinLength(6,{message: 'password must be at least 6 characters'})
    password: string;
}
