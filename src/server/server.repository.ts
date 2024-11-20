import { InjectModel } from "@nestjs/mongoose";
import { ServerRepositoryInterface } from "./interfaces/server.repository.interface";
import { Server } from "./server.schema";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ServerRepository implements ServerRepositoryInterface {
    constructor(@InjectModel(Server.name) private readonly serverModule: Model<Server>){}
    async createServer(): Promise<Server> {
        try{
            const server = await this.serverModule.create({});
            if(!server){
                throw new Error("Server doesn't created");
            }
            return server;
        }catch (err:any){
            throw err
        }
    }

    async getUserServers(userId: string): Promise<Server[]> {
        try{
            const servers = await this.serverModule.find({ admin: userId });
            return servers;
        }catch(err: any){
            throw err;
        }
    }
}