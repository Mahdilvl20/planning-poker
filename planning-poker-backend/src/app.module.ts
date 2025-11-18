import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RoomsModule } from './rooms/rooms.module';
import { MessagesModule } from './messages/messages.module';
import { WebsocketsModule } from './websockets/websockets.module';
import { ConfigModule } from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from "src/users/entities/user.entity";
import {Room} from "src/rooms/entities/room.entity";
import {Message} from "src/messages/entities/message.entity";

@Module({
  imports: [ConfigModule.forRoot({
      isGlobal: true,
  }), AuthModule, UsersModule, RoomsModule, MessagesModule, WebsocketsModule,TypeOrmModule.forRoot({
      type: 'postgres',
      host:process.env.HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
      entities: [User, Room,Message],
  }),
      UsersModule,
      AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
