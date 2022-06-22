import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import {
  CognitoAccessToken,
  CognitoIdToken,
  CognitoRefreshToken,
  CognitoUserSession,
} from 'amazon-cognito-identity-js';
import { Observable } from 'rxjs';

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

  handleRequest(err: Error, user: User, info, context, status): any {
    console.log(info);

    if (err) {
      throw err || new UnauthorizedException();
    }

    console.log('Guard', user);
    return user;
  }

  checkTokenExpiration(req) {
    const accessToken = new CognitoAccessToken({
      AccessToken: req.user.tokens.accessToken,
    });
    const idToken = new CognitoIdToken({ IdToken: req.user.tokens.idToken });
    const refreshToken = new CognitoRefreshToken({
      RefreshToken: req.user.tokens.refreshToken,
    });
    const sessionData = {
      IdToken: idToken,
      AccessToken: accessToken,
      RefreshToken: refreshToken,
    };

    const cachedSession = new CognitoUserSession(sessionData);

    // if (cachedSession.isValid()) {
    //   next();
    // } else {
    //   cognitoUser = getCognitoUser(req);
    //   cognitoUser.refreshSession(RefreshToken, (err, session) => {
    //     if (err) throw err;
    //     const tokens = getTokens(session);
    //     AWS.config.credentials = getCognitoIdentityCredentials(tokens);
    //     AWS.config.credentials.get(function () {
    //       const credentials = AWS.config.credentials.data.Credentials;
    //       req.session.AWSCredentials = getAWSCredentials(credentials);
    //       next();
    //     });
    //   });
    // }
  }
}
