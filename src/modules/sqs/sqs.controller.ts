import { Controller, Get } from '@nestjs/common';
import { SQSService } from './sqs.service';

@Controller()
export class SqsController {
  constructor(private readonly sqsService: SQSService) {}
}
