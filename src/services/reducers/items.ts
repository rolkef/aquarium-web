import {AnyAction} from "redux";
import { createReducer} from "typesafe-actions";
import {fetchCoralsActions, fetchAnimalsActions, fetchAnimalActions} from "../actions/items"; //fetchAnimalsActions,
import {AnimalList, CoralList} from "../rest/types";
import {Animal, AquariumItem, Coral} from "../rest/interface";

const initialState : AquariumItemsState = {
    isLoading: false,
    corals : [],
    animals: [],
    coral: new Coral(),
    animal: new Animal(),
    aquariumitem: new AquariumItem(),
    errorMessage: '',

}


export interface AquariumItemsState {
    isLoading: boolean;
    corals: Coral[];
    animals: Animal[];
    coral: Coral;
    animal: Animal;
    aquariumitem: AquariumItem;
    errorMessage: string;
}

export const items = createReducer<AquariumItemsState, AnyAction>(initialState)
    .handleAction(fetchCoralsActions.request,  (state, action) =>
        ({ ...state, isLoading: true, errorMessage: '' }))
    .handleAction(fetchCoralsActions.success, (state, action) =>
        ({ ...state, isLoading: false, corals: action.payload }))
    .handleAction(fetchCoralsActions.failure, (state, action) =>
        ({ ...state, isLoading: false, errorMessage: action.payload.message }))
    .handleAction(fetchAnimalsActions.request,  (state, action) =>
        ({ ...state, isLoading: true, errorMessage: '' }))
    .handleAction(fetchAnimalsActions.success, (state, action) =>
        ({ ...state, isLoading: false, animals: action.payload }))
    .handleAction(fetchAnimalsActions.failure, (state, action) =>
        ({ ...state, isLoading: false, errorMessage: action.payload.message }))
    .handleAction(fetchAnimalActions.request,  (state, action) =>
        ({ ...state, isLoading: true, errorMessage: '' }))
    .handleAction(fetchAnimalActions.success, (state, action) =>
        ({ ...state, isLoading: false, animal: action.payload }))
    .handleAction(fetchAnimalActions.failure, (state, action) =>
        ({ ...state, isLoading: false, errorMessage: action.payload.message }))
