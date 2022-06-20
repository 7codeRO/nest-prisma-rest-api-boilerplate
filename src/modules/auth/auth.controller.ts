import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';

import { AuthResponseDTO, UserDTO } from './auth.dto';
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

  @Post('login-cognito')
  @ApiOperation({ description: 'Login user with Cognito AWS Service' })
  @ApiBody({ type: UserDTO })
  async cognitoLogin(@Body() user: UserDTO) {
    return this.authService.cognitoLogin(user);
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
