import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    MessageBody, ConnectedSocket
} from '@nestjs/websockets';
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
    private onlineusersOnroom:Record<string, string[]>={};
    constructor(private jwt:JwtService) {
    }
    async handleConnection(client:Socket){
        try {
            const token=client.handshake.headers.authorization?.split(" ")[1];
            if(!token) return client.disconnect();
            const payload=this.jwt.verify(token);
            const userId=payload.sub;
            const username = payload.name || payload.username || `User${userId}`;
            this.onlineUsers.set(userId,client.id);
            client.data.userId=userId;
            client.data.username=username;
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
    @SubscribeMessage('join-room')
    handleJoinRoom(
        @MessageBody() data: { roomId: string; name: string },
        @ConnectedSocket() client: Socket,
    ) {
        const { roomId, name } = data;

        if (!this.onlineusersOnroom[roomId]) {
            this.onlineusersOnroom[roomId] = [];
        }


        if (!this.onlineusersOnroom[roomId].includes(name)) {
            this.onlineusersOnroom[roomId].push(name);
        }


        client.join(roomId);

        const usersInRoom = this.onlineusersOnroom[roomId];
        this.server.to(roomId).emit('roomUsers', usersInRoom);

        return { success: true, users: usersInRoom };
    }
}
