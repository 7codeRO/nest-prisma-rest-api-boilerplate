import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';

import {
  AuthResponseDTO, RefreshTokenDTO,
  UserConfigPasswordDTO,
  UserConfirmDTO,
  UserDTO,
  UserForgotPassword,
} from './auth.dto';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register-cognito')
  @ApiOperation({ description: 'Register user with Cognito AWS Service' })
  @ApiBody({ type: UserDTO })
  async cognitoRegister(@Body() user: UserDTO) {
    return this.authService.cognitoRegister(user);
  }

  @Post('confirm-user-cognito')
  @ApiOperation({ description: 'Confirm user with Cognito AWS Service' })
  @ApiBody({ type: UserConfirmDTO })
  async cognitoConfirmUser(@Body() user: UserConfirmDTO) {
    return this.authService.cognitoConfirmUser(user);
  }

  @Post('login-cognito')
  @ApiOperation({ description: 'Login user with Cognito AWS Service' })
  @ApiBody({ type: UserDTO })
  async cognitoLogin(@Body() user: UserDTO) {
    return this.authService.cognitoLogin(user);
  }

  @Post('forgot-password-cognito')
  @ApiOperation({
    description: 'Forgot password for user with Cognito AWS Service',
  })
  @ApiBody({ type: UserForgotPassword })
  async cognitoForgotPassword(@Body() user: UserForgotPassword) {
    return this.authService.cognitoForgotPassword(user);
  }

  @Post('confirm-password-cognito')
  @ApiOperation({
    description: 'Confirm password for user with Cognito AWS Service',
  })
  @ApiBody({ type: UserConfigPasswordDTO })
  async cognitoConfirmPassword(@Body() user: UserConfigPasswordDTO) {
    return this.authService.cognitoConfirmPassword(user);
  }

  @Post('refresh-token-cognito')
  @ApiOperation({ description: 'Refresh expired AWS cognito auth tokens' })
  @ApiBody({ type: UserDTO })
  async cognitoRefreshToken(@Body() token: RefreshTokenDTO) {
    return this.authService.cognitoRefreshToken(token);
  }

  @Post('register')
  @ApiOperation({
    description: 'Register user with Prisma Service and proprietary database',
  })
  @ApiBody({ type: UserDTO })
  async register(@Body() user: UserDTO): Promise<User> {
    return this.authService.register(user);
  }

  @Post('login')
  @ApiOperation({
    description: 'Login user with Prisma Service and proprietary database',
  })
  @ApiBody({ type: UserDTO })
  @ApiResponse({ type: AuthResponseDTO })
  async login(@Body() user: UserDTO): Promise<AuthResponseDTO> {
    return this.authService.login(user);
  }
}
