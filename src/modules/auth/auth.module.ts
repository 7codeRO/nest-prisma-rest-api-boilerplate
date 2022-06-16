import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from 'src/shared/constants/global.constants';

import { UserService } from '../user/user.service';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';

import { JwtStrategy } from './auth.jwt.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthConfig } from './auth.config';

@Module({
  imports: [
    JwtModule.register({
      secret: JWT_SECRET,
    }),
    PrismaModule,
  ],
  providers: [UserService, AuthService, JwtStrategy, PrismaService, AuthConfig],
  controllers: [AuthController],
})
export class AuthModule {}
