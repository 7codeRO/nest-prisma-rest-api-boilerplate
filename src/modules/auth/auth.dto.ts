import { User } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

import { INVALID_EMAIL } from '../../shared/constants/strings';

export class AuthResponseDTO {
  user: User;
  accessToken: string;
}

export class RegisterUserDTO {
  email: string;
  name: string;
  password: string;
}

export class LoginUserDTO {
  @IsString()
  @IsNotEmpty()
  @IsEmail({}, { message: INVALID_EMAIL })
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
