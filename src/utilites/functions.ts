import {Cell} from "../models/Cell";
import {Figure} from "../models/figures/Figure";
import {Colors} from "../models/Colors";

export const getTransitCoordinates = (target: Cell, thisFigure: Figure): Array<Array<number>> => {
    const transitCells: Array<Array<number>> = [];
    const courseX = target.x - thisFigure.cell.x > 0 ? 1 : -1;
    const courseY = target.y - thisFigure.cell.y > 0 ? 1 : -1;
    for (let x = thisFigure.cell.x + courseX, y = thisFigure.cell.y + courseY;
         x !== target.x && y !== target.y;
         x = x + courseX, y = y + courseY) {
        transitCells.push([x, y]);
    }
    return transitCells;
};

export const getCanCrushColoCondition = (target: Cell, thisFigure: Figure): boolean => {
    const conditionWhite = target.figure?.color === Colors.BLACK;
    const conditionBlack = target.figure?.color === Colors.WHITE;

     return thisFigure.color === Colors.WHITE
        ? conditionWhite
        : conditionBlack;
};

export const getNextCellAfterCrushedFigure = (target: Cell, thisFigure: Figure): Array<number> | false => {
    const courseY = target.y - thisFigure.cell.y > 0 ? 1 : -1;
    const courseX = target.x - thisFigure.cell.x > 0 ? 1 : -1;
    const nextCellX = target.x + courseX;
    const nextCellY = target.y + courseY;
    if (nextCellX >= 0 && nextCellX <= 7 && nextCellY >= 0 && nextCellY <= 7) {
        return [nextCellX, nextCellY];
    }
    return false;
};