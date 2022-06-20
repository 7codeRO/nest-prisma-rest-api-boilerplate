import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
  CognitoUserSession,
} from 'amazon-cognito-identity-js';
import { GLOBAL_CONFIG } from 'src/configs/global.config';
import { AuthHelpers } from 'src/shared/helpers/auth.helpers';

import { UserService } from '../user/user.service';

import { AuthConfig } from './auth.config';
import {
  AuthResponseDTO,
  UserConfigPasswordDTO,
  UserConfirmDTO,
  UserDTO,
  UserForgotPassword,
} from './auth.dto';

@Injectable()
export class AuthService {
  private userPool: CognitoUserPool;

  constructor(
    private authConfig: AuthConfig,
    private userService: UserService,
    private jwtService: JwtService,
  ) {
    this.userPool = new CognitoUserPool({
      UserPoolId: this.authConfig.userPoolId,
      ClientId: this.authConfig.clientId,
    });
  }

  async cognitoRegister(user: UserDTO): Promise<CognitoUser> {
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

  async cognitoConfirmUser(user: UserConfirmDTO) {
    const { name, email, confirmationCode } = user;

    const userData = {
      Username: name || email,
      Pool: this.userPool,
    };

    const cognitoUser = new CognitoUser(userData);

    return new Promise((resolve, reject) => {
      cognitoUser.confirmRegistration(confirmationCode, true, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  async cognitoLogin(user: UserDTO): Promise<CognitoUserSession> {
    const { name, email, password } = user;

    const authenticationDetails = new AuthenticationDetails({
      Username: name || email,
      Password: password,
    });

    const userData = {
      Username: name || email,
      Pool: this.userPool,
    };

    const cognitoUser = new CognitoUser(userData);

    return new Promise((resolve, reject) => {
      return cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          resolve(result);
        },
        onFailure: (err) => {
          reject(err);
        },
      });
    });
  }

  async cognitoForgotPassword(user: UserForgotPassword): Promise<any> {
    const { name, email } = user;

    const userData = {
      Username: name || email,
      Pool: this.userPool,
    };

    const cognitoUser = new CognitoUser(userData);

    return new Promise((resolve, reject) => {
      return cognitoUser.forgotPassword({
        onSuccess: (data) => {
          resolve(data);
        },
        onFailure: (err) => {
          reject(err);
        },
      });
    });
  }

  async cognitoConfirmPassword(user: UserConfigPasswordDTO): Promise<string> {
    const { name, password, email, verificationCode } = user;

    const userData = {
      Username: name || email,
      Pool: this.userPool,
    };

    const cognitoUser = new CognitoUser(userData);

    return new Promise((resolve, reject) => {
      return cognitoUser.confirmPassword(verificationCode, password, {
        onSuccess(data) {
          resolve(data);
        },
        onFailure(err) {
          reject(err);
        },
      });
    });
  }

  public async register(user: UserDTO): Promise<User> {
    return this.userService.createUser(user);
  }

  async login(user: UserDTO): Promise<AuthResponseDTO> {
    const userData = await this.userService.findUser({
      email: user.email,
    });

    if (!userData) {
      throw new UnauthorizedException();
    }

    const isMatch = await AuthHelpers.verify(user.password, userData.password);

    if (!isMatch) {
      throw new UnauthorizedException();
    }

    const payload = {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      password: null,
    };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: GLOBAL_CONFIG.security.expiresIn,
    });

    return {
      user: payload,
      accessToken: accessToken,
    };
  }
}
