import { io } from "socket.io-client";

let socket:any = null;

export const connectSocket = (token: string) => {
    if (!socket) {
        socket = io("http://localhost:3000", {
            extraHeaders: {
                Authorization: `Bearer ${token}`,
            },
        });
    }
    return socket;
};

export const getSocket = () => socket;
