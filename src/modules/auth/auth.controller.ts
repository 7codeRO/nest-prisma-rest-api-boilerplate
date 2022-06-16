import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { UserDTO } from './auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ description: 'Register user' })
  @ApiBody({ type: UserDTO })
  async register(@Body() user: UserDTO) {
    return this.authService.register(user);
  }

  @Post('login')
  @ApiOperation({ description: 'Login user' })
  @ApiBody({ type: UserDTO })
  async login(@Body() user: UserDTO) {
    return this.authService.login(user);
  }
}
