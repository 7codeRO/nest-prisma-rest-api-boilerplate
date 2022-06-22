import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';
import { passportJwtSecret } from 'jwks-rsa';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { AuthConfig } from '../auth.config';

@Injectable()
export class JwtCognitoStrategy extends PassportStrategy(
  Strategy,
  'jwt-cognito',
) {
  constructor(private authConfig: AuthConfig) {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${authConfig.authority}/.well-known/jwks.json`,
      }),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: authConfig.clientId,
      issuer: authConfig.authority,
      algorithms: ['RS256'],
    });
  }

  async validate(payload: User): Promise<User> {
    const { email } = payload;
    console.log('payload', payload);

    if (!email) {
      throw new UnauthorizedException();
    }

    return payload;
  }
}
