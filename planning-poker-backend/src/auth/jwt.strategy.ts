import {Injectable, InternalServerErrorException, UnauthorizedException} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {ConfigService} from "@nestjs/config";
import { ExtractJwt, Strategy } from 'passport-jwt';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'jwt'){
    constructor(private configService: ConfigService) {
        const secret = configService.get<string>('JWT_SECRET');
        if(!secret){
            throw new InternalServerErrorException('Invalid JWT_SECRET');
        }
        // @ts-ignore
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration:false,
            secretOrKey:secret,
        });
    }
    async validate(payload:any){
        if(!payload.sub || !payload.email){
            throw new UnauthorizedException('invalid token');
        }
        return {
            userId:payload.sub,
            email:payload.email,
            name:payload.name,
        };
    }
}