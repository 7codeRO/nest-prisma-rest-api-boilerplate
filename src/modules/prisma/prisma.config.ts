import { PrismaClientOptions } from '@prisma/client/runtime';

export type LogLevel = 'info' | 'query' | 'warn' | 'error';
export type LogDefinition = {
  level: LogLevel;
  emit: 'stdout' | 'event';
};

export const PRISMA_LOG_CONFIG: Array<LogDefinition> = [
  { level: 'warn', emit: 'stdout' },
  { level: 'info', emit: 'stdout' },
  { level: 'error', emit: 'stdout' },
  { level: 'query', emit: 'stdout' },
];

export const PRISMA_CLIENT_OPTIONS: PrismaClientOptions = {
  log: PRISMA_LOG_CONFIG,
  rejectOnNotFound: true,
  __internal: {
    hooks: {
      // beforeRequest: (params) => {
      //   // Do something
      // },
    },
  },
};
