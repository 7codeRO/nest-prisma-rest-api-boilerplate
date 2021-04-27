import { Post, Prisma } from '@prisma/client';

interface PostInterface {
  findOne(
    postWhereUniqueInput: Prisma.PostWhereUniqueInput,
  ): Promise<Post | null>;

  findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PostWhereUniqueInput;
    where?: Prisma.PostWhereInput;
    orderBy?: Prisma.PostOrderByInput;
  }): Promise<Post[] | null>;

  create(data: Prisma.PostCreateInput): Promise<Post>;

  update(params: {
    where: Prisma.PostWhereUniqueInput;
    data: Prisma.PostUpdateInput;
  }): Promise<Post>;

  delete(where: Prisma.PostWhereUniqueInput): Promise<Post>;
}

export { PostInterface };
