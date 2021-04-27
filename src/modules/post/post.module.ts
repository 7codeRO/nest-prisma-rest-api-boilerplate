import { Module } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { InterfaceServiceAlias } from '../../shared/constants/service.constants';

import { PostService } from './post.service';
import { PostController } from './post.controller';

@Module({
  imports: [],
  controllers: [PostController],
  providers: [
    PrismaService,
    {
      provide: InterfaceServiceAlias.POST_SERVICE,
      useClass: PostService,
    },
  ],
  exports: [
    {
      provide: InterfaceServiceAlias.POST_SERVICE,
      useClass: PostService,
    },
  ],
})
export class PostModule {}
