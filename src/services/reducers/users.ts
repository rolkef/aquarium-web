import {Aquarium, UserResponse} from '../rest/interface';
import { createReducer } from 'typesafe-actions';
import { AnyAction } from 'redux';
import {currentAquarium, loggedIn, loggedOut, register} from '../actions/users';
import { clearUserData } from '../rest/security-helper';

const initialState: UserResponse = {
  init(_data?: any): void {},
  toJSON(data?: any): any {},
  user: undefined,
  authenticationInformation: undefined,
};

export const user = createReducer<UserResponse, AnyAction>(initialState)
  .handleAction(loggedIn, (state, action) => {
    return action.payload;
  })
  .handleAction(loggedOut, (state, action) => {
    clearUserData();
    return initialState;
  })
  .handleAction(register, (state, action) => {
    return action.payload;
  });

export const currentaquarium = createReducer<Aquarium, AnyAction>(new Aquarium())
    .handleAction(currentAquarium, (state, action) => {
      return action.payload;
    });