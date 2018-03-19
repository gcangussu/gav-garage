import jwt from 'jsonwebtoken';
import { ContextParameters } from 'graphql-yoga/dist/src/types';

import { Prisma, UserRole, User } from './generated/prisma';
import { APP_SECRET } from './constants';

export interface Context extends ContextParameters {
  db: Prisma;
}

export interface Authentication {
  id: string;
  role: UserRole;
}

export function getToken(user: User) {
  return jwt.sign(
    {
      id: user.id,
      role: user.role,
    } as Authentication,
    APP_SECRET,
  );
}

export function authenticate(ctx: Context) {
  const authHeader = ctx.request.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new AuthError();
  }

  const token = authHeader.slice(7);
  return jwt.verify(token, APP_SECRET) as Authentication;
}

export class AuthError extends Error {
  constructor() {
    super('Not authorized');
  }
}
