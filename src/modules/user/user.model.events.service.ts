import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserModelEventsService {
  static async onCreated(params, next) {
    console.log(params.args);

    // Check incoming query type
    if (params.model == 'User') {
      if (params.action === 'create' || params.action === 'update') {
        const saltOrRounds = 10;
        const password = params.args['data'].password;

        const encryptedPass = await bcrypt.hash(password, saltOrRounds);

        params.args['data'] = {
          ...params.args['data'],
          password: encryptedPass,
        };
      }
    }
    console.log(params.args);
    return next(params);
  }
}
