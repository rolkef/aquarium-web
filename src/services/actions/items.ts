import {Animal, AquariumClient, Coral} from "../rest/interface";
import {createAsyncAction} from "typesafe-actions";
import {ThunkAction} from "redux-thunk";
import {RootState} from "../reducers";
import {AnyAction} from "redux";
import {IConfig} from "../rest/iconfig";
import config from "../rest/server-config";

export const fetchCoralsActions = createAsyncAction(
    'FETCH_CORALS_REQUEST',
    'FETCH_CORALS_SUCCESS',
    'FETCH_CORALS_FAILURE')<void, Coral[], Error>();

export const fetchAnimalsActions = createAsyncAction(
    'FETCH_ANIMALS_REQUEST',
    'FETCH_ANIMALS_SUCCESS',
    'FETCH_ANIMALS_FAILURE')<void, Animal[], Error>();

export const fetchAnimalActions = createAsyncAction(
    'FETCH_ANIMAL_REQUEST',
    'FETCH_ANIMAL_SUCCESS',
    'FETCH_ANIMAL_FAILURE')<void, Animal, Error>();

export const fetchCoralActions = createAsyncAction(
    'FETCH_CORAL_REQUEST',
    'FETCH_CORAL_SUCCESS',
    'FETCH_CORAL_FAILURE')<void, Coral, Error>();

export type CoralsResult = ReturnType<typeof fetchCoralsActions.success> | ReturnType<typeof fetchCoralsActions.failure>
export type AnimalsResult = ReturnType<typeof fetchAnimalsActions.success> | ReturnType<typeof fetchAnimalsActions.failure>
export type AnimalResult = ReturnType<typeof fetchAnimalActions.success> | ReturnType<typeof fetchAnimalActions.failure>
export type CoralResult = ReturnType<typeof fetchCoralActions.success> | ReturnType<typeof fetchCoralActions.failure>


export const fetchCoralsAction = ():ThunkAction<Promise<CoralsResult>, RootState, null, AnyAction> =>
    (dispatch, getState) => {

        dispatch(fetchCoralsActions.request());
        const token = getState().user.authenticationInformation!.token || '';
        const accessheader = new IConfig();
        accessheader.setToken(token);
        // accessheader.getAuthorization()
        const aquariumClient = new AquariumClient(accessheader, config.host);

        return aquariumClient.getCorals("SchiScho")
            .then(
                corals =>dispatch(fetchCoralsActions.success(corals))
            )
            .catch(
                err => dispatch(fetchCoralsActions.failure(err))
            )
    };

export const fetchAnimalsAction = ():ThunkAction<Promise<AnimalsResult>, RootState, null, AnyAction> =>
    (dispatch, getState) => {

        dispatch(fetchAnimalsActions.request());
        const token = getState().user.authenticationInformation!.token || '';
        const accessheader = new IConfig();
        accessheader.setToken(token);
        // accessheader.getAuthorization()
        const aquariumClient = new AquariumClient(accessheader, config.host);

        return aquariumClient.getAnimals("SchiScho")
            .then(
                animals =>dispatch(fetchAnimalsActions.success(animals))
            )
            .catch(
                err => dispatch(fetchAnimalsActions.failure(err))
            )
    };

export const fetchAnimalAction = (id: string):ThunkAction<Promise<AnimalResult>, RootState, null, AnyAction> =>
    (dispatch, getState) => {

        dispatch(fetchAnimalActions.request());
        const token = getState().user.authenticationInformation!.token || '';
        const accessheader = new IConfig();
        accessheader.setToken(token);
        // accessheader.getAuthorization()
        const aquariumClient = new AquariumClient(accessheader, config.host);

        // create
        return aquariumClient.getAnimal("SchiScho", id)
            .then(
                animal =>dispatch(fetchAnimalActions.success(animal))
            )
            .catch(
                err => dispatch(fetchAnimalActions.failure(err))
            )
    };

export const fetchCoralAction = (id: string):ThunkAction<Promise<CoralResult>, RootState, null, AnyAction> =>
    (dispatch, getState) => {

        dispatch(fetchCoralActions.request());
        const token = getState().user.authenticationInformation!.token || '';
        const accessheader = new IConfig();
        accessheader.setToken(token);
        // accessheader.getAuthorization()
        const aquariumClient = new AquariumClient(accessheader, config.host);

        // create
        return aquariumClient.getCoral("SchiScho", id)
            .then(
                animal =>dispatch(fetchCoralActions.success(animal))
            )
            .catch(
                err => dispatch(fetchCoralActions.failure(err))
            )
    };