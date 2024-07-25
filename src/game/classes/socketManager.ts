import {io, Socket} from "socket.io-client";
import {AuthManager} from "./authManager";

export class SocketManager {
    private socket: Socket;
    private static instance: SocketManager = new SocketManager();


    constructor() {
        if (SocketManager.instance)
        {
            throw new Error("Error: Instantiation failed: Use SingletonClass.getInstance() instead of new.");
        }
        SocketManager.instance = this;
    }

    public static getInstance(): SocketManager
    {
        SocketManager.instance = SocketManager.instance || new SocketManager();
        return SocketManager.instance;
    }

    getSocket(){
        if (this.socket)
        {
            return this.socket;
        }
        else {
            const socketIP = process.env.SOCKET_IP;
            this.socket = io(`wss://${socketIP}`, {
                auth: {
                    token: AuthManager.getInstance().getAuthToken()
                }
            });
            this.socket.emit('playerJoin');
            return this.socket;
        }
    }

    isSocketConnected()
    {
        return this.socket.connected;
    }
}