import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

import { PRISMA_ERRORS } from '../shared/constants/prisma.constants';
import { InvalidFormException } from '../exceptions/invalid.form.exception';

@Injectable()
export class PrismaInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // next.handle() is an Observable of the controller's result value
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          const constraint = error.meta && error.meta['target'].join(', ');
          const customMessage = PRISMA_ERRORS[error.code].replace(
            '{constraint}',
            constraint,
          );

          const errors = {
            [constraint]: customMessage,
          };

          const prismaErrorSplitStr = `invocation:\n\n\n  `;

          const errorMessage =
            error.message.split(prismaErrorSplitStr)[1] || error.message;

          throw new InvalidFormException(errors, errorMessage);
        } else {
          throw error;
        }
      }),
    );
  }
}
