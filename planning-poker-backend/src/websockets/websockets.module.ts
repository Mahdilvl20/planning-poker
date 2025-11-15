import { Module } from '@nestjs/common';
import { WebsocketsService } from './websockets.service';
import { WebsocketsGateway } from './websockets.gateway';
import {JwtModule} from "@nestjs/jwt";
import {AuthModule} from "src/auth/auth.module";

@Module({
    imports: [AuthModule],
    providers: [WebsocketsGateway, WebsocketsService],
})
export class WebsocketsModule {}
