// @flow
import { Map } from 'immutable';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import {
  createReducer,
  getTokenFromLocalStorage,
  setTokenOnLocalStorage,
} from './utils';
import { setToken, clearToken } from './actions';

const initialState = Map({
  token: getTokenFromLocalStorage(),
});

type S = typeof initialState;

const handlers = {
  [setToken.toString()]: (state: S, { token }) => {
    setTokenOnLocalStorage(token);
    return state.set('token', token);
  },

  [clearToken.toString()]: (state: S) => state.set('token', ''),
};

const reducer = combineReducers({
  main: createReducer(initialState, handlers),
  form: formReducer,
});

export default reducer;
