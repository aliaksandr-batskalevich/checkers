import {Cell} from "../models/Cell";
import {Colors} from "../models/Colors";

export type AppActionsType = ReturnType<typeof setInitApp>
    | ReturnType<typeof setGameType>
    | ReturnType<typeof setLevel>
    | ReturnType<typeof setIsWinner>
    | ReturnType<typeof setCount>
    | ReturnType<typeof setOrder>
    | ReturnType<typeof setStatus>
    | ReturnType<typeof setSelectedCell>;

export enum Level {
    LOW = 'low',
    MIDDLE = 'middle',
    HIGH = 'high',
}

export enum Status {
    WAIT = 'wait',
    MOVE = 'move',
    CRASH = 'crash',
}

export enum GameType {
    ONE = 'one',
    TWO= 'two',
}

type AppStateType = {
    isAppInit: boolean
    gameType: GameType
    level: Level
    isWinner: null | Colors
    count: Array<number>
    order: Colors
    status: Status
    selectedCell: null | Cell
};

const appInitState: AppStateType = {
    isAppInit: false,
    gameType: GameType.ONE,
    level: Level.LOW,
    isWinner: null,
    count: [12, 12],
    order: Colors.BLACK,
    status: Status.WAIT,
    selectedCell: null,
}

export const appReducer = (state: AppStateType = appInitState, action: AppActionsType): AppStateType => {
    switch (action.type) {
        case 'INIT_APP':
            return {...state, ...action.payload};
        case 'SET_GAME_TYPE':
            return {...state, ...action.payload};
        case 'CHANGE_LEVEL':
            return {...state, ...action.payload};
        case 'SET_IS_WINNER':
            return {...state, ...action.payload};
        case 'SET_COUNT':
            return {...state, ...action.payload};
        case 'SET_ORDER':
            return {...state, ...action.payload};
        case 'SET_STATUS':
            return {...state, ...action.payload};
        case 'SET_SELECTED_CELL':
            return {...state, ...action.payload};
        default:
            return state;
    }
}

export const setInitApp = (isAppInit: boolean) => {
    return {
        type: 'INIT_APP',
        payload: {isAppInit}
    } as const;
};

export const setGameType = (gameType: GameType) => {
    return {
        type: 'SET_GAME_TYPE',
        payload: {gameType}
    } as const;
};

export const setLevel = (level: Level) => {
    return {
        type: 'CHANGE_LEVEL',
        payload: {level}
    } as const;
};

export const setCount = (count: Array<number>) => {
    return {
        type: 'SET_COUNT',
        payload: {count}
    } as const;
};

export const setOrder = (order: Colors) => {
    return {
        type: 'SET_ORDER',
        payload: {order}
    } as const;
};

export const setStatus = (status: Status) => {
    return {
        type: 'SET_STATUS',
        payload: {status}
    } as const;
};

export const setSelectedCell = (selectedCell: null | Cell) => {
    return {
        type: 'SET_SELECTED_CELL',
        payload: {selectedCell}
    } as const;
};

export const setIsWinner = (isWinner: Colors | null) => {
    return {
        type: 'SET_IS_WINNER',
        payload: {isWinner}
    } as const;
};