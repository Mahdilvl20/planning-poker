import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RoomsModule } from './rooms/rooms.module';
import { MessagesModule } from './messages/messages.module';
import { WebsocketsModule } from './websockets/websockets.module';

@Module({
  imports: [ConfigModule, AuthModule, UsersModule, RoomsModule, MessagesModule, WebsocketsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
