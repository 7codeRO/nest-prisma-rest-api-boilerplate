import { User } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { INVALID_EMAIL } from 'src/shared/constants/strings';

export class AuthResponseDTO {
  user: User;
  accessToken: string;
}
export class UserDTO {
  @IsString()
  @IsNotEmpty()
  @IsEmail({}, { message: INVALID_EMAIL })
  email: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsNotEmpty()
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
