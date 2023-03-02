import {RootStateType} from "./store";
import {Status} from "./appReducer";
import {Board} from "../models/Board";
import {Cell} from "../models/Cell";
import {Colors} from "../models/Colors";

// app
export const getIsAppInit = (state: RootStateType): boolean => state.app.isAppInit;
export const getCount = (state: RootStateType): Array<number> => state.app.count;
export const getOrder = (state: RootStateType): Colors => state.app.order;
export const getStatus = (state: RootStateType): Status => state.app.status;
export const getSelectedCell = (state: RootStateType): null | Cell =>state.app.selectedCell;

// board
export const getBoard = (state: RootStateType): Board => state.board.board;
