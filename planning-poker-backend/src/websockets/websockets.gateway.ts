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
import {MessagesService} from "src/messages/messages.service";




interface RoomVoteState{
    isOpen: boolean;
    revealed:boolean;
    votes:Record<string,string | number>;
}
@WebSocketGateway({
    cors: {origin:'*'},
})
export class WebsocketsGateway
    implements OnGatewayConnection,OnGatewayDisconnect{
    @WebSocketServer()
    server: Server;
    private onlineUsers=new Map<number,string>();
    private onlineusersOnroom:Record<string, string[]>={};
    private userRooms=new Map<number, Set<string>>(); // userId -> Set of roomIds
    constructor(private jwt:JwtService,private messageService:MessagesService) {
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
        const username=client.data.username;
        
        if(userId){
            this.onlineUsers.delete(userId);
            
            // Remove user from all rooms they were in
            const userRoomIds = this.userRooms.get(userId);
            if(userRoomIds && userRoomIds.size > 0){
                userRoomIds.forEach(roomId => {
                    // Remove username from room's user list
                    if(this.onlineusersOnroom[roomId]){
                        this.onlineusersOnroom[roomId] = this.onlineusersOnroom[roomId].filter(
                            name => name !== username
                        );
                        
                        // Notify other users in the room
                        const updatedUsers = this.onlineusersOnroom[roomId];
                        this.server.to(roomId).emit('roomUsers', updatedUsers);
                    }
                });
                
                // Clear user's rooms
                this.userRooms.delete(userId);
            }
        }
    }
    @SubscribeMessage('join-room')
     async handleJoinRoom(
        @MessageBody() data: { roomId: string; name: string },
        @ConnectedSocket() client: Socket,
    ) {
        const { roomId, name } = data;
        const userId = client.data.userId;

        if (!this.onlineusersOnroom[roomId]) {
            this.onlineusersOnroom[roomId] = [];
        }

        if (!this.onlineusersOnroom[roomId].includes(name)) {
            this.onlineusersOnroom[roomId].push(name);
        }

        client.join(roomId);

        // Track which rooms this user is in
        if(userId){
            if(!this.userRooms.has(userId)){
                this.userRooms.set(userId, new Set());
            }
            this.userRooms.get(userId)?.add(roomId);
        }

        const usersInRoom = this.onlineusersOnroom[roomId];
        this.server.to(roomId).emit('roomUsers', usersInRoom);

        const previousMessages= await this.messageService.findByRoomId(roomId);
        const formattedMessages = previousMessages.map(msg => ({
            id: msg.id,
            roomId: msg.roomId,
            userId: msg.userId,
            name: msg.name,
            message: msg.message,
            timestamp: msg.timestamp instanceof Date
                ? msg.timestamp.toISOString()
                : typeof msg.timestamp === 'string'
                    ? msg.timestamp
                    : new Date(msg.timestamp).toISOString(),
        }));
        client.emit('previous-messages', formattedMessages);
        return { success: true, users: usersInRoom };
    }

    @SubscribeMessage('leave-room')
    handleLeaveRoom(
        @MessageBody() data: { roomId: string; name: string },
        @ConnectedSocket() client: Socket,
    ) {
        const { roomId, name } = data;
        const userId = client.data.userId;

        if (this.onlineusersOnroom[roomId]) {
            this.onlineusersOnroom[roomId] = this.onlineusersOnroom[roomId].filter(
                userName => userName !== name
            );
        }

        client.leave(roomId);

        if (userId) {
            const userRoomIds = this.userRooms.get(userId);
            if (userRoomIds) {
                userRoomIds.delete(roomId);
                if (userRoomIds.size === 0) {
                    this.userRooms.delete(userId);
                }
            }
        }

        const usersInRoom = this.onlineusersOnroom[roomId] || [];
        this.server.to(roomId).emit('roomUsers', usersInRoom);

        return { success: true, users: usersInRoom };
    }
    @SubscribeMessage('send-message')
    async handleSendMessage(
        @MessageBody() data:{roomId:string,name:string,message:string},
        @ConnectedSocket() client: Socket,
    ) {
        const {roomId,name,message} = data;
        const userId = client.data.userId;
        const savedMessage=await this.messageService.create({
            roomId,
            userId,
            message,
            name,
        })
        const messageData={
            id:Date.now(),
            roomId,
            name,
            message,
            userId,
            timestamp:new Date().toISOString(),
        };

        this.server.to(roomId).emit('new-message', messageData);

        return { success: true, message:messageData };
    }
    @SubscribeMessage('get-previous-messages')
    async handleGetPreviousMessages(
        @MessageBody() data: { roomId: string },
        @ConnectedSocket() client: Socket,
    ) {
        const { roomId } = data;


        const previousMessages = await this.messageService.findByRoomId(roomId);

        const formattedMessages = previousMessages.map(msg => ({
            id: msg.id,
            roomId: msg.roomId,
            userId: msg.userId,
            name: msg.name,
            message: msg.message,
            timestamp: msg.timestamp instanceof Date
                ? msg.timestamp.toISOString()
                : typeof msg.timestamp === 'string'
                    ? msg.timestamp
                    : new Date(msg.timestamp).toISOString(),
        }));



        client.emit('previous-messages', formattedMessages);

        return { success: true, count: formattedMessages.length };
    }
    private roomVotes :Record<string, RoomVoteState>={};
    @SubscribeMessage('open-vote')
    async handleOpenVote(
        @MessageBody() data: { roomId: string },
        @ConnectedSocket() client: Socket,
    ){
        const { roomId } = data;

        this.roomVotes[roomId]={
            isOpen:true,
            revealed:false,
            votes:{}
        }
        this.server.to(roomId).emit('vote-started');

        this.server.to(roomId).emit('vote-update',{});

    }

    @SubscribeMessage('submit-vote')
    handleSubmitVote(
        @MessageBody() data: { roomId: string,vote:string | number },
        @ConnectedSocket() client: Socket,) {
        const { roomId,vote } = data;
        const userId = client.data.userId;

        if(!this.roomVotes[roomId]) return;

        this.roomVotes[roomId].votes[userId] = vote;

        if(!this.roomVotes[roomId].revealed){
            const votedUserIds=Object.keys(this.roomVotes[roomId].votes);
            this.server.to(roomId).emit('vote-status-update',votedUserIds);
        }else {
            this.server.to(roomId).emit('vote-update',this.roomVotes[roomId].votes);
        }
    }

    @SubscribeMessage('reveal-vote')
    handleRevealVote(
        @MessageBody() data: { roomId: string },
        @ConnectedSocket() client: Socket,
    ){
        const { roomId } = data;
        if (this.roomVotes[roomId]){
            this.roomVotes[roomId].revealed=true;
            this.roomVotes[roomId].isOpen=false;


            this.server.to(roomId).emit('vote-reveal',this.roomVotes[roomId].votes);
        }
    }

}
