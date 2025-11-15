import {OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer} from '@nestjs/websockets';
import {Server,Socket} from "socket.io";
import {JwtService} from "@nestjs/jwt";

@WebSocketGateway({
    cors: {origin:'*'},
})
export class WebsocketsGateway
    implements OnGatewayConnection,OnGatewayDisconnect{
    @WebSocketServer()
    server: Server;
    private onlineUsers=new Map<number,string>();
    constructor(private jwt:JwtService) {
    }
    async handleConnection(client:Socket){
        try {
            const token=client.handshake.headers.authorization?.split(" ")[1];
            if(!token) return client.disconnect();
            const payload=this.jwt.verify(token);
            const userId=payload.sub;
            this.onlineUsers.set(userId,client.id);
            client.data.userId=userId;
            console.log(`User connected via WS: ${userId}`);
        } catch(err){
            client.disconnect();
            console.log(err);
        }

    }
    handleDisconnect(client:Socket){
        const userId=client.data.userId;
        if(userId){
            this.onlineUsers.delete(userId);
        }
    }
}
