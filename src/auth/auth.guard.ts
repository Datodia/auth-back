import { BadGatewayException, CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) { }
    async canActivate(context: ExecutionContext): Promise<boolean> {

        try {

            const req = context.switchToHttp().getRequest()
            const token = this.getToken(req.headers)
            if (!token) throw new UnauthorizedException()

            const payload = await this.jwtService.verifyAsync(token)
            req.userId = payload.sub

            return true
        } catch (e) {
            throw new UnauthorizedException
        }
    }


    getToken(header) {
        if (!header['authorization']) return
        const [type, token] = header['authorization'].split(' ')
        return type === 'Bearer' ? token : null
    }
}