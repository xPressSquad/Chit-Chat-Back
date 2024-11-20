import { userDocument } from "../user.schema";

export interface UserRepositoryInterface {
    getAllUsers(): Promise<userDocument[]>
}