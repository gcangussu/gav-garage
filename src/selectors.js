// @flow
import { createSelector } from 'reselect';
import { getEnvironment } from './relay';

export const getMain = (state: any) => state.main;

export const getToken = createSelector(getMain, state => state.get('token'));

export const isAuthenticated = createSelector(getToken, Boolean);

export const getRelayEnvironment = createSelector(getToken, token =>
  getEnvironment(token),
);
