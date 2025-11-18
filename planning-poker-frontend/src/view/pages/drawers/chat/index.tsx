import {Box,List,ListItem,Paper,ListItemText,TextField,Button} from '@mui/material';
import {useEffect, useRef, useState} from "react";
import {getSocket} from "../../socket";

interface Message {
    id:number;
    message:string;
    name:string;
    timestamp:string;
}

export default function Chat({roomId}:{roomId:string}){
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage,setNewMessage] = useState("");
    const messagesEndRef=useRef<HTMLDivElement>(null);
    const socket=getSocket();
    const name=localStorage.getItem('name');

    const scrollToBottom=()=>{
        messagesEndRef.current?.scrollIntoView({behavior:"smooth"});
    };
    useEffect(()=>{
        scrollToBottom();
    },[messages]);

    useEffect(()=>{
        if(!socket || !roomId) return;
        const requestPreviousMessages = () => {
            socket.emit('get-previous-messages', { roomId });
        };
        const handlePreviousMessages=(previousMessage:Message[]) => {
            setMessages(previousMessage.map(msg => ({
                id: msg.id,
                message: msg.message,
                name: msg.name,
                timestamp: typeof msg.timestamp === 'string'
                    ? msg.timestamp
                    : msg.timestamp instanceof Date
                        ? msg.timestamp.toISOString()
                        : new Date(msg.timestamp).toISOString(),
            })));
        }
        const handleNewMessage = (messageData:Message) => {
            const formattedMessage = {
                id: messageData.id,
                message: messageData.message,
                name: messageData.name,
                timestamp: typeof messageData.timestamp === 'string'
                    ? messageData.timestamp
                    : messageData.timestamp instanceof Date
                        ? messageData.timestamp.toISOString()
                        : new Date(messageData.timestamp).toISOString(),
            };
            setMessages((prev) => [...prev, formattedMessage]);
        }
        socket.on('previous-messages',handlePreviousMessages);
        socket.on('new-message', handleNewMessage);
        if (socket.connected) {
            requestPreviousMessages();
        } else {
            socket.once('connect', requestPreviousMessages);
        }
        return () => {
            socket.off('previous-messages',handlePreviousMessages);
            socket.off('new-message', handleNewMessage);
        }
    },[socket,roomId]);

    const handleSendMessage=()=>{
        if (!newMessage.trim() || !socket || !roomId) return;
        console.log(newMessage);
        socket.emit('send-message', {
            roomId,
            message:newMessage,
            name,
        });
        setNewMessage("");
    }

    const handelKeyPres=(e: React.KeyboardEvent)=>{
        if (e.key === 'Enter' && !e.shiftKey){
            e.preventDefault();
            handleSendMessage();
        }
    }

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
        }}>
            <Box sx={{
                flex:1,
                overflowY: 'auto',
                p:1,
                display: 'flex',
                flexDirection: 'column',
            }}>
                <List>
                    {messages.map((msg)=>(
                        <ListItem key={msg.id} sx={{
                            flexDirection:'column',
                            alignItems:msg.name===name?'flex-end':'flex-start',
                        }}>
                            <Paper sx={{p:1.5,mb:0.5,maxWidth:'70%',
                                backgroundColor:msg.name===name ? "#636CCB" : "#f0f0f0",
                                color: msg.name === name ? "white" : "black",
                            }}>
                                <ListItemText primary={msg.message} secondary={`${msg.name}-${new Date(msg.timestamp).toLocaleTimeString()}`}/>

                            </Paper>
                        </ListItem>
                    ))}
                </List>
                <div ref={messagesEndRef}/>
            </Box>
            <TextField
                fullWidth
                size={'small'}
                placeholder={'write a new message...'}
                value={newMessage}
                onChange={(e)=>setNewMessage(e.target.value)}
                onKeyPress={handelKeyPres}
                multiline
                maxRows={2}/>
            <Button variant={'contained'} onClick={handleSendMessage}
                    disabled={!newMessage.trim()}>
                send
            </Button>
        </Box>
    )
}