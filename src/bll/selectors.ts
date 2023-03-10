import {RootStateType} from "./store";
import {GameType, Level, Status} from "./appReducer";
import {Board} from "../models/Board";
import {Cell} from "../models/Cell";
import {Colors} from "../models/Colors";
import {createSelector} from "reselect";

// app
export const getIsAppInit = (state: RootStateType): boolean => state.app.isAppInit;
export const getGameType = (state: RootStateType): GameType => state.app.gameType;
export const getLevel = (state: RootStateType): Level => state.app.level;
export const getIsWinner = (state: RootStateType): null | Colors => state.app.isWinner;
export const getCount = (state: RootStateType): Array<number> => state.app.count;
export const getOrder = (state: RootStateType): Colors => state.app.order;
export const getStatus = (state: RootStateType): Status => state.app.status;
export const getSelectedCell = (state: RootStateType): null | Cell =>state.app.selectedCell;

// board
export const getBoard = (state: RootStateType): Board => state.board.board;
export const getForwards = createSelector(getBoard, (board: Board): Array<Cell> => board.getAllCells().filter(cell => cell.isForward));
