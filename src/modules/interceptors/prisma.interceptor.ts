import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class PrismaInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // next.handle() is an Observable of the controller's result value
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          // const constraint = error.meta && error.meta['target'].join(', ') ;
          // const message = PRISMA_ERRORS[error.code].replace('{constraint}', constraint);
          // console.log({message});

          throw new BadRequestException(error.message);
        } else {
          throw error;
        }
      }),
    );
  }
}
