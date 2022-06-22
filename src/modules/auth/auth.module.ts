import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from 'src/shared/constants/global.constants';

import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';

import { AuthConfig } from './auth.config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtCognitoStrategy, JwtStrategy } from './strategies';

@Module({
  imports: [
    JwtModule.register({
      secret: JWT_SECRET,
    }),
    PrismaModule,
  ],
  providers: [
    UserService,
    AuthService,
    JwtStrategy,
    JwtCognitoStrategy,
    PrismaService,
    AuthConfig,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
