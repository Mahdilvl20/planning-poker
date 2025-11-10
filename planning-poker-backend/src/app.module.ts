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
  }),
      UsersModule,
      AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
