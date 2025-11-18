import { Module } from '@nestjs/common';
import { WebsocketsService } from './websockets.service';
import { WebsocketsGateway } from './websockets.gateway';
import {JwtModule} from "@nestjs/jwt";
import {AuthModule} from "src/auth/auth.module";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {MessagesModule} from "src/messages/messages.module";

@Module({
    imports: [AuthModule,JwtModule.registerAsync({
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
            secret: configService.get<string>('JWT_SECRET'),
            signOptions: {expiresIn:'1d'},
        }),
        inject: [ConfigService],
    }),
        MessagesModule
    ],
    providers: [WebsocketsGateway, WebsocketsService],
})
export class WebsocketsModule {}
