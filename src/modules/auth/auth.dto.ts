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

export class UserConfirmDTO {
  @IsString()
  @IsNotEmpty()
  @IsEmail({}, { message: INVALID_EMAIL })
  email: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsNotEmpty()
  confirmationCode: string;
}

export class UserForgotPassword {
  @IsString()
  @IsNotEmpty()
  @IsEmail({}, { message: INVALID_EMAIL })
  email: string;

  @IsString()
  @IsOptional()
  name: string;
}

export class UserConfigPasswordDTO extends UserDTO {
  @IsString()
  @IsNotEmpty()
  verificationCode: string;
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

export class CognitoResponseDTO {
  @IsString()
  @IsNotEmpty()
  sub: string;
}

export class RefreshTokenDTO {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  token: string;
}
