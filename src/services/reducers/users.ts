import {Aquarium, UserResponse, AquariumUserResponse} from '../rest/interface';
import { createReducer } from 'typesafe-actions';
import { AnyAction } from 'redux';
import {currentAquarium, loggedIn, loggedOut, register, fetchAquariumActions, fetchAquariumsActions,} from '../actions/users';
import { clearUserData } from '../rest/security-helper';

const initialState: UserResponse = {
  init(_data?: any): void {},
  toJSON(data?: any): any {},
  user: undefined,
  authenticationInformation: undefined,
};

const initialAquariumState: AquariumState =
    {
        isLoading: false,
        errorMessage: "",
        //aquariumuserresponse: null,
        aquariumlist: []
    }

export interface AquariumState {
    isLoading: boolean;
    errorMessage: string;
    // aquariumuserresponse : Aquarium | null;
    aquariumlist: AquariumUserResponse[] | null;
}

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

export const aquariums = createReducer<AquariumState, AnyAction>(initialAquariumState)
    .handleAction(fetchAquariumsActions.request, (state, action) =>
        ({...state, isLoading: true, errorMessage: ''}))
    .handleAction(fetchAquariumActions.request, (state, action) =>
        ({...state, isLoading: true, errorMessage: ''}))
    .handleAction(fetchAquariumActions.failure, (state, action) =>
        ({...state, isLoading: false, errorMessage: action.payload.message}))
    .handleAction(fetchAquariumActions.success, (state, action) =>
        ({...state, isLoading: false, aquariumuserresponse: action.payload}))
    .handleAction(fetchAquariumsActions.failure, (state, action) =>
        ({...state, isLoading: false, errorMessage: action.payload.message}))
    .handleAction(fetchAquariumsActions.success, (state, action) =>
        ({...state, isLoading: false, aquariumlist: action.payload}))