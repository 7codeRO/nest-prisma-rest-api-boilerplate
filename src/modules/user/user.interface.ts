import { Prisma, User } from '@prisma/client';

interface IUserService {
  findUser(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null>;

  users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByInput;
  }): Promise<User[] | null>;

  createUser(data: Prisma.UserCreateInput): Promise<User | null>;

  updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User | null>;

  deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User | null>;
}

export { IUserService };
