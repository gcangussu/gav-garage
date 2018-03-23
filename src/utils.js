// @flow
import type { HandlesMap, Action } from './types';

export function createReducer<S>(initialState: S, handlesMap: HandlesMap<S>) {
  return (state: S = initialState, action: Action<>) => {
    const handler = handlesMap[action.type];
    return handler ? handler(state, action.payload) : state;
  };
}

export function createAction<D, P>(
  type: string,
  fn: (data: D) => P,
): (data: D) => Action<P> {
  const actionCreator = (data: D) => ({
    type,
    payload: fn(data),
  });
  // $FlowFixMe
  actionCreator.toString = () => type;
  return actionCreator;
}

const LOCAL_STORAGE_TOKEN_KEY = 'session';

export function setTokenOnLocalStorage(token: string) {
  localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token);
}

export function getTokenFromLocalStorage(): string {
  return localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY) || '';
}

export function removeTokenFromLocalStorage() {
  localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
}
