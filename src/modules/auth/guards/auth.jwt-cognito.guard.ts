import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { Observable } from 'rxjs';
import { TOKEN_EXPIRED } from '../../../shared/constants/auth.constants';

@Injectable()
export class JwtCognitoAuthGuard extends AuthGuard('jwt-cognito') {
  constructor(private reflector: Reflector) {
    super(reflector);
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    return super.canActivate(context);
  }

  handleRequest(err: Error, user: User, info): any {
    if(info.name === TOKEN_EXPIRED) {
      throw new UnauthorizedException(info.message)
    }
    if (err || !user) {
      throw err || new UnauthorizedException();
    }

    return user;
  }

}
