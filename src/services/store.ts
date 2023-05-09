import rootReducer from "./reducers";
import thunk from "redux-thunk";
import {applyMiddleware, createStore} from "redux";


const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppDispatch = typeof store.dispatch;
export default store;