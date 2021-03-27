import { Module } from '@nestjs/common';

import { PrismaService } from './prisma.service';
import { UserModelEventsService } from '../user/user.model.events.service';

@Module({
  providers: [PrismaService, UserModelEventsService],
  exports: [PrismaService],
})
export class PrismaModule {}
