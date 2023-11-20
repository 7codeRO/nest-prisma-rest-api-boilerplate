import { Module } from '@nestjs/common';
import { ProducerService } from './kafka.producer.service';
import { ConsumerService } from './kafka.consumer.service';

@Module({
  providers: [ProducerService, ConsumerService],
  exports: [ProducerService, ConsumerService],
})
export class KafkaModule {}
