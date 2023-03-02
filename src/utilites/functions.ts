import {Cell} from "../models/Cell";
import {Colors} from "../models/Colors";

export const getTransitCoordinates = (target: Cell, thisCell: Cell): Array<Array<number>> => {
    const transitCells: Array<Array<number>> = [];
    const courseX = target.x - thisCell.x > 0 ? 1 : -1;
    const courseY = target.y - thisCell.y > 0 ? 1 : -1;
    for (let x = thisCell.x + courseX, y = thisCell.y + courseY;
         x !== target.x && y !== target.y;
         x = x + courseX, y = y + courseY) {
        transitCells.push([x, y]);
    }
    return transitCells;
};

export const getCanCrushColorCondition = (target: Cell, thisColor: Colors): boolean => {
    const conditionWhite = target.figure?.color === Colors.BLACK;
    const conditionBlack = target.figure?.color === Colors.WHITE;

    return thisColor === Colors.WHITE
        ? conditionWhite
        : conditionBlack;
};

export const getNextCellAfterCrushedFigure = (target: Cell, thisCell: Cell): Array<number> | false => {
    const courseY = target.y - thisCell.y > 0 ? 1 : -1;
    const courseX = target.x - thisCell.x > 0 ? 1 : -1;
    const nextCellX = target.x + courseX;
    const nextCellY = target.y + courseY;
    if (nextCellX >= 0 && nextCellX <= 7 && nextCellY >= 0 && nextCellY <= 7) {
        return [nextCellX, nextCellY];
    }
    return false;
};

// no double figures on course & mineFigure
export const testKingTransitCell = (transitCells: Array<Cell>, thisColor: Colors): boolean => transitCells.reduce((acc, cell, i, arr) => acc
    && !(
        (arr[i + 1]
            && cell.figure
            && arr[i + 1].figure)
        || cell.figure?.color === thisColor), true);