import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UserService } from '../user/user.service';
import { AuthResponseDTO, LoginUserDTO, RegisterUserDTO } from './auth.dto';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  public async login(loginUserDTO: LoginUserDTO): Promise<AuthResponseDTO> {
    const userData = await this.userService.findUser({
      email: loginUserDTO.email,
    });

    console.log({ userData });

    if (!userData) {
      throw new UnauthorizedException();
    }

    const isMatch = await bcrypt.compare(
      loginUserDTO.password,
      userData.password,
    );
    if (!isMatch) {
      throw new UnauthorizedException();
    }

    const payload = {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      password: null,
      // role: userData.role,
    };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: 3600, //1h
    });

    return {
      user: payload,
      accessToken: accessToken,
    };
  }

  public async register(user: RegisterUserDTO): Promise<User> {
    return this.userService.createUser(user);
  }
}
