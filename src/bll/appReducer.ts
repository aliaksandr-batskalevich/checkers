import {Cell} from "../models/Cell";
import {Colors} from "../models/Colors";

export type AppActionsType = ReturnType<typeof setInitApp>
    | ReturnType<typeof setIsWinner>
    | ReturnType<typeof setCount>
    | ReturnType<typeof setOrder>
    | ReturnType<typeof setStatus>
    | ReturnType<typeof setSelectedCell>;

export enum Status {
    WAIT = 'wait',
    MOVE = 'move',
    CRUSH = 'crush',
}

type AppStateType = {
    isWinner: null | Colors
    isAppInit: boolean
    count: Array<number>
    order: Colors
    status: Status
    selectedCell: null | Cell
};

const appInitState: AppStateType = {
    isWinner: null,
    isAppInit: false,
    count: [12, 12],
    order: Colors.BLACK,
    status: Status.WAIT,
    selectedCell: null,
}

export const appReducer = (state: AppStateType = appInitState, action: AppActionsType): AppStateType => {
    switch (action.type) {
        case 'INIT_APP':
            return {...state, isAppInit: true};
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

export const setInitApp = () => {
    return {
        type: 'INIT_APP'
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