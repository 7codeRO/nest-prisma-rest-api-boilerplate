import { Module } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { PrismaModule } from '../prisma/prisma.module';
import { InterfaceServiceAlias } from '../../shared/constants/service.constants';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserListener } from './user.listener';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [
    PrismaService,
    UserListener,
    {
      provide: InterfaceServiceAlias.USER_SERVICE,
      useClass: UserService,
    },
  ],
  exports: [
    {
      provide: InterfaceServiceAlias.USER_SERVICE,
      useClass: UserService,
    },
  ],
})
export class UserModule {}
