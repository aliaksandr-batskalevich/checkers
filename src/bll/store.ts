import {combineReducers, legacy_createStore} from "redux";
import {AppActionsType, appReducer} from "./appReducer";
import {boardReducer} from "./boardReducer";

export type RootStateType = ReturnType<typeof rootReducer>;
export type RootActionsType = AppActionsType;


const rootReducer = combineReducers({
    app: appReducer,
    board: boardReducer,
});

export const store = legacy_createStore(rootReducer);