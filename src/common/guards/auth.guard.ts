import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { AuthService } from "../../auth/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private readonly authService: AuthService){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        if(!request.headers.authorization) throw new UnauthorizedException('Token not provided');
        
        const token = request.headers.authorization?.split(" ")[1];
        if(!token || token === '') throw new UnauthorizedException('Token not provided');
        try {
            const user = this.authService.validateToken(token);
            request.user = user;
            return true;
        } catch (err) {
            throw new UnauthorizedException('Invalid token');
        }
    }
}