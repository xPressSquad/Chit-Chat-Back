import { Server } from "../server.schema";

export interface ServerRepositoryInterface {
    createServer(): Promise<Server>
    getUserServers(userId: string): Promise<Server[]>
}