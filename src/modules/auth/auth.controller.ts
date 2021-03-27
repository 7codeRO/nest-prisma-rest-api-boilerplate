import { Controller, Post, Body } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { AuthResponseDTO, LoginUserDTO, RegisterUserDTO } from './auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ description: 'Login user' })
  @ApiBody({ type: LoginUserDTO })
  @ApiResponse({ type: AuthResponseDTO })
  async login(@Body() user: LoginUserDTO): Promise<AuthResponseDTO> {
    console.log('/login');
    return this.authService.login(user);
  }

  @Post('register')
  async register(@Body() user: RegisterUserDTO): Promise<any> {
    return this.authService.register(user);
  }
}
