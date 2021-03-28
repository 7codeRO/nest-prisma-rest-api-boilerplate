import { Module } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { PostService } from './post.service';
import { PostController } from './post.controller';

@Module({
  imports: [],
  controllers: [PostController],
  providers: [PostService, PrismaService],
  exports: [PostService],
})
export class PostModule {}
