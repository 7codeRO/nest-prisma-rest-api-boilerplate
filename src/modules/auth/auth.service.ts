import { Injectable } from '@nestjs/common';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
  CognitoUserSession,
} from 'amazon-cognito-identity-js';

import { UserDTO } from './auth.dto';
import { AuthConfig } from './auth.config';

@Injectable()
export class AuthService {
  private userPool: CognitoUserPool;

  constructor(private authConfig: AuthConfig) {
    this.userPool = new CognitoUserPool({
      UserPoolId: this.authConfig.userPoolId,
      ClientId: this.authConfig.clientId,
    });
  }

  async register(user: UserDTO): Promise<CognitoUser> {
    const { name, email, password } = user;

    return new Promise((resolve, reject) => {
      return this.userPool.signUp(
        name || email,
        password,
        [new CognitoUserAttribute({ Name: 'email', Value: email })],
        null,
        (err, result) => {
          if (!result) {
            reject(err);
          } else {
            resolve(result.user);
          }
        },
      );
    });
  }

  async login(user: UserDTO): Promise<CognitoUserSession> {
    const { name, email, password } = user;

    const authenticationDetails = new AuthenticationDetails({
      Username: name || email,
      Password: password,
    });

    const userData = {
      Username: name || email,
      Pool: this.userPool,
    };

    const newUser = new CognitoUser(userData);

    return new Promise((resolve, reject) => {
      return newUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          resolve(result);
        },
        onFailure: (err) => {
          reject(err);
        },
      });
    });
  }
}
