import { WebSocketGateway } from '@nestjs/websockets';
import { WebsocketsService } from './websockets.service';

@WebSocketGateway()
export class WebsocketsGateway {
  constructor(private readonly websocketsService: WebsocketsService) {}
}
