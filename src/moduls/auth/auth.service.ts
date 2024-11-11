import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { Injectable } from '@nestjs/common';

dotenv.config();

@Injectable()

export class AuthService {

    validateToken(token: string) {
        try{
            const decode = jwt.verify(token, process.env.SECRET_KEY);
            return decode;
        }catch(err: any){
            throw err
        }
    }
}