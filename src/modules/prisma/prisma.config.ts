import { PrismaClientOptions } from '@prisma/client/runtime';

export type LogLevel = 'info' | 'query' | 'warn' | 'error';
export type LogDefinition = {
  level: LogLevel;
  emit: 'stdout' | 'event';
};

export const PRISMA_LOG_CONFIG: Array<LogDefinition> = [
  { level: 'warn', emit: 'event' },
  { level: 'info', emit: 'event' },
  { level: 'error', emit: 'event' },
];

export const PRISMA_CLIENT_OPTIONS: PrismaClientOptions = {
  log: PRISMA_LOG_CONFIG,
  // log: ['error', 'query'],
  rejectOnNotFound: true,
  __internal: {
    hooks: {
      beforeRequest: (params) => {
        console.log('beforeRequest', params);
      },
    },
  },
};
