// @flow
import { createAction } from './utils';

export const setToken = createAction('SET_TOKEN', (token: string) => ({
  token,
}));

export const clearToken = createAction('CLEAR_TOKEN', () => null);
