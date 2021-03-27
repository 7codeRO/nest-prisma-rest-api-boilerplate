import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './auth.jwt.strategy';
import { JWT_SECRET } from '../../shared/constants/global.constants';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [
    JwtModule.register({
      secret: JWT_SECRET,
    }),
    PrismaModule,
  ],
  providers: [UserService, AuthService, JwtStrategy, PrismaService],
  controllers: [AuthController],
})
export class AuthModule {}
