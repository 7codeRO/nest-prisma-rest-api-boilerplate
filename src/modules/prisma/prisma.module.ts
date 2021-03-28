import { Module } from '@nestjs/common';

import { UserModelEventsService } from '../user/user.model.events.service';

import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService, UserModelEventsService],
  exports: [PrismaService],
})
export class PrismaModule {}
