import { io, Socket } from "socket.io-client";

class SocketManager {
	private socket: Socket | null = null;
	private socketId: string | null = null;
	private room: string | null = null;

	constructor() {
		this.initialize();
	}

	private initialize() {
		this.socket = io({
			path: "/collaboration_service/socket.io/",
		});

		this.socket.on("connect", () => {
			this.socketId = this.socket?.id || null;
			console.log(`Connected with Socket ID: ${this.socketId}`);
		});
	}

	public connect() {
		this.socket?.connect();
	}

	public disconnect() {
		this.socket?.disconnect();
	}

	public getSocket(): Socket | null {
		return this.socket;
	}

	public getSocketId(): string | null {
		return this.socketId;
	}

	public getRoom(): string | null {
		return this.room;
	}

	public setRoom(r: string | null) {
		this.socket.emit("joinRoom", r);
		this.room = r;
	}

	public leaveRoom() {
		this.socket.emit("leaveRoom", this.room);
		this.room = null;
	}

	public subscribeToEvent(eventName: any, callback: any) {
		this.socket?.on(eventName, callback);
	}

	public emitEvent(eventName: any, data: any) {
		this.socket?.emit(eventName, data);
	}
}

const collabSocketManager = new SocketManager();
export default collabSocketManager;
