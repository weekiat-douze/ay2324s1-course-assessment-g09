import { io, Socket } from "socket.io-client";

class SocketManager {
	private socket: Socket | null = null;
	private socketId: string | null = null;
	private room: string | null = null;
	private matchedUser: string | null = null;
	constructor() {
		this.initialize();
	}

	private initialize() {
		this.socket = io("http://localhost:6927/");

		this.socket.on("connect", () => {
			this.socketId = this.socket?.id || null;
			console.log(`Matching socket connected on: ${this.socketId}`);
		});
	}

	public getSocket(): Socket | null {
		return this.socket;
	}

	public getSocketId(): string | null {
		return this.socketId;
	}
	public getMatchedRoom(): string | null {
		return this.room;
	}

	public setMatchedRoom(r: string | null) {
		console.log("set room", r);
		this.room = r;
	}

	public setMatchedUser(u: string | null) {
		console.log("set matched user", u);
		this.matchedUser = u;
	}

	public getMatchedUser(): string | null {
		return this.matchedUser;
	}

	public subscribeToEvent(eventName: any, callback: any) {
		this.socket.on(eventName, callback);
	}

	public emitEvent(eventName: any, data: any) {
		this.socket.emit(eventName, data);
	}
}

const MatchsocketManager = new SocketManager();
export default MatchsocketManager;