import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class OriginGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const ip = request.ip;
        console.log(ip);
        const allowedIps = ['127.0.0.1', '::1'];
        if(allowedIps.includes(ip)){
            return true;
        }
        throw new UnauthorizedException('Request origin not allowed');
    }
}