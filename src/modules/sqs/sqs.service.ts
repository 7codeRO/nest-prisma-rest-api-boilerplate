import { Injectable, Logger } from '@nestjs/common';
import {
  DeleteMessageCommand,
  ReceiveMessageCommand,
  SQSClient,
} from '@aws-sdk/client-sqs';

@Injectable()
export class SQSService {
  private readonly logger = new Logger(SQSService.name);
  private sqs: SQSClient;
  private indexingJobProgressQueue = 'queue_url';

  constructor() {
    this.sqs = new SQSClient({
      region: 'us-east-1',
    });
  }

  public async deleteMessage(message) {
    const deleteParams = {
      QueueUrl: this.indexingJobProgressQueue,
      ReceiptHandle: message.ReceiptHandle,
    };

    const deleteCommand = new DeleteMessageCommand(deleteParams);
    try {
      await this.sqs.send(deleteCommand);
      this.logger.log('Message deleted successfully.');
    } catch (err) {
      this.logger.error('Error deleting message:', err);
    }
  }

  public async receiveMessages(callback) {
    const params = {
      QueueUrl: this.indexingJobProgressQueue,
      // MaxNumberOfMessages: 5, // Maximum number of messages to receive (1-10)
      WaitTimeSeconds: 1, // maximum 20 seconds
    };

    const receiveCommand = new ReceiveMessageCommand(params);

    try {
      const response = await this.sqs.send(receiveCommand);
      const messages = response.Messages || [];

      if (messages.length === 0) {
        this.logger.log('No messages received.');
        return;
      }

      messages.forEach((message) => {
        this.logger.log('Received message:', message.Body);
        callback(message);
      });
    } catch (err) {
      this.logger.error('Error receiving messages:', err);
    } finally {
      await this.receiveMessages(callback);
    }
  }
}
