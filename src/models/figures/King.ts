import {Figure, FiguresNames} from "./Figure";
import {Colors} from "../Colors";
import {Cell} from "../Cell";
import whiteKingLogo from '../../assets/images/white-king.png';
import blackKingLogo from '../../assets/images/black-king.png';
import {Board} from "../Board";
import {getCanCrushColoCondition, getNextCellAfterCrushedFigure, getTransitCoordinates} from "../../utilites/functions";

export class King extends Figure {

    constructor(color: Colors, cell: Cell) {
        super(color, cell);

        this.name = FiguresNames.KING;
        this.logo = color === Colors.WHITE ? whiteKingLogo : blackKingLogo;
    }

    canMove(target: Cell, board: Board): boolean {
        const preCondition = target.color === Colors.BLACK && !target.figure
            // diagonal
            && Math.abs(target.y - this.cell.y) === Math.abs(target.x - this.cell.x);

        if (!preCondition) return false;

        // no double figures on course & mineFigure
        const transitCoordinates = getTransitCoordinates(target, this);
        const transitCells = transitCoordinates.map(coordinate => {
            const [x, y] = coordinate;
            return board.getCell(x, y);
        });
        const transitCondition = transitCells.reduce((acc, cell, i, arr) => acc && !((arr[i + 1] && cell.figure && arr[i + 1].figure) || cell.figure?.color === this.color), true);

        return transitCondition;
    }

    canCrush(target: Cell, board: Board): boolean {
        const isCourseCondition = Math.abs(this.cell.x - target.x) === Math.abs(this.cell.y - target.y);
        const colorCondition = getCanCrushColoCondition(target, this);
        const nextCellCoordinates = getNextCellAfterCrushedFigure(target, this);
        if (!(isCourseCondition && nextCellCoordinates && colorCondition)) return false;

        const [nextCellX, nextCellY] = nextCellCoordinates;
        const nextTargetCell = board.getCell(nextCellX, nextCellY);
        const freeNextCellCondition = !nextTargetCell.figure;

        return freeNextCellCondition && nextTargetCell.isAvailable;
    }
}