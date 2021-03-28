import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

import { UserModelEventsService } from '../user/user.model.events.service';

import { PRISMA_CLIENT_OPTIONS } from './prisma.config';

@Injectable()
export class PrismaService
  extends PrismaClient<Prisma.PrismaClientOptions, 'error' | 'query'>
  implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super({ ...PRISMA_CLIENT_OPTIONS });
  }

  async onModuleInit() {
    await this.$connect();

    this.$on('error', (_e) => {
      // Do something
    });

    this.$use(UserModelEventsService.onCreated);
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
