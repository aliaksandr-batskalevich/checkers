import {Figure, FiguresNames} from "./Figure";
import {Colors} from "../Colors";
import {Cell} from "../Cell";
import whiteManLogo from '../../assets/images/white-man.png';
import blackManLogo from '../../assets/images/black-man.png';
import {Board} from "../Board";


export class Man extends Figure {

    constructor(color: Colors, cell: Cell) {
        super(color, cell);

        this.name = FiguresNames.MAN;
        this.logo = color === Colors.WHITE ? whiteManLogo : blackManLogo;
    }

    canMove(target: Cell): boolean {

        const conditionWhite = target.y === this.cell.y + 1;
        const conditionBlack = target.y === this.cell.y - 1;

        const colorCondition = this.color === Colors.WHITE
            ? conditionWhite
            : conditionBlack;

        const condition = target.color === Colors.BLACK
            && !target.figure
            && colorCondition
            && Math.abs(target.x - this.cell.x) === 1;

        return condition;
    }

    canCrush(target: Cell, board: Board): boolean {
        const conditionWhite = target.figure?.color === Colors.BLACK;
        const conditionBlack = target.figure?.color === Colors.WHITE;

        const colorCondition = this.color === Colors.WHITE
            ? conditionWhite
            : conditionBlack;

        const courseY = target.y - this.cell.y;
        const courseX = target.x - this.cell.x;
        const nextCellX = target.x + courseX;
        const nextCellY = target.y + courseY;
        const isNextCell = nextCellX >= 0 && nextCellX <= 7 && nextCellY >= 0 && nextCellY <= 7;

        if (!isNextCell) return false;

        const nextTargetCell = board.getCell(nextCellX, nextCellY);
        const freeNextCellCondition = !nextTargetCell.figure;

        const condition = colorCondition
            && Math.abs(target.x - this.cell.x) === 1
            && Math.abs(target.y - this.cell.y) === 1
            && freeNextCellCondition;

        if (condition) nextTargetCell.isAvailable = true;

        return condition;
    }


}