import { Logger, Module } from '@nestjs/common';
import { SQSService } from './sqs.service';
import { SqsController } from './sqs.controller';

@Module({
  imports: [],
  controllers: [SqsController],
  providers: [SQSService, Logger],
  exports: [SQSService],
})
export class SqsModule {}
