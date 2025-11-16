
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const initSocket = (): Socket | null => {
    if (socket) return socket;

    const token = localStorage.getItem("access_token");
    if (!token) {
        console.warn("No access_token in localStorage. Socket not initialized.");
        return null;
    }

    socket = io("http://localhost:3000", {
        extraHeaders: {
            Authorization: `Bearer ${token}`,
        },
    });

    socket.on("connect", () => {
        // @ts-ignore
        console.log("Socket connected:", socket.id);
    });

    socket.on("connect_error", (err) => {
        console.error("Socket connection error:", err.message);
    });

    socket.on("disconnect", () => {
        console.log("Socket disconnected");
    });

    return socket;
};

export const getSocket = (): Socket | null => {
    return socket || initSocket();
};

