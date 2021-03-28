import { BadRequestException } from '@nestjs/common';

export class InvalidFormException extends BadRequestException {
  constructor(private errors: { [key: string]: string }, message: string) {
    super(message);
  }

  getErrorMessage(): string {
    return this.message;
  }

  getFieldErrors(): { [key: string]: string } {
    return this.errors;
  }
}
