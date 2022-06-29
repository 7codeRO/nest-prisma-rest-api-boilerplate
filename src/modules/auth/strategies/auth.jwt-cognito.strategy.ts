import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { passportJwtSecret } from 'jwks-rsa';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { AuthConfig } from '../auth.config';
import { CognitoResponseDTO } from '../auth.dto';

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

  async validate(payload: CognitoResponseDTO): Promise<CognitoResponseDTO> {
    const { sub } = payload;

    if (!sub) {
      throw new UnauthorizedException();
    }

    return payload;
  }
}
