import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {UsersModule} from "src/users/users.module";
import {JwtModule} from "@nestjs/jwt";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {JwtStrategy} from "src/auth/jwt.strategy";
import {Passport} from "passport";
import {PassportModule} from "@nestjs/passport";


@Module({
  imports:[
      PassportModule.register({defaultStrategy:'jwt'}),
      UsersModule,ConfigModule,JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService:ConfigService)=>({
      secret:configService.get<string>('JWT_SECRET'),
      signOptions:{expiresIn:'2h'},
  }),
      inject: [ConfigService],
  }),],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy],
    exports:[JwtModule,AuthService],
})
export class AuthModule {}
