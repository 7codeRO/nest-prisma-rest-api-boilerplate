//eslint-disable-next-line
require('dotenv').config();

export const JWT_SECRET = process.env.JWT_SIGNATURE;

export enum ROLES_ENUM {
  ADMIN = 'admin',
  USER = 'user',
}

export const ROLES = {
  ADMIN: 'admin',
  USER: 'user',
};
export const DEFAULT_PAGE_LIMIT = 10;
export const MAX_PAGE_LIMIT = 100;

export const DEFAULT_SORT_BY = 'id';

export const API_PREFIX = '/api/v1';

//Regex
export const PHONE_REGEX = /^[0-9\s+-.()]+$/;

export const SLUG_SEPARATOR = '-';
