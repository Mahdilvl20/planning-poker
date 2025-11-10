import { Module } from '@nestjs/common';
import { WebsocketsService } from './websockets.service';
import { WebsocketsGateway } from './websockets.gateway';

@Module({
  providers: [WebsocketsGateway, WebsocketsService],
})
export class WebsocketsModule {}
