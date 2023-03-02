import {Board} from "../models/Board";

export type BoardActionsType = ReturnType<typeof setBoard>

export type BoardStateType = {
    board: Board
};

const boardInitState: BoardStateType = {
    board: new Board(),
};


export const boardReducer = (state: BoardStateType = boardInitState, action: BoardActionsType): BoardStateType => {
    switch (action.type) {
        case 'SET_BOARD':
            return {...state, ...action.payload};
        default:
            return state;
    }
};

export const setBoard = (board: Board) => {
    return {
        type: 'SET_BOARD',
        payload: {board}
    } as const;
};