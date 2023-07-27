// store.js

import {legacy_createStore} from "redux";
import rootReducer from "./reducers/reducers";
import { applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";

//TODO: Persist

// export the store
export default legacy_createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

// export const createAction = (type, payload) => ({ type, payload });