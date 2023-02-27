import {Figure, FiguresNames} from "./Figure";
import {Colors} from "../Colors";
import {Cell} from "../Cell";
import whiteKingLogo from '../../assets/images/white-king.png';
import blackKingLogo from '../../assets/images/black-king.png';

export class King extends Figure {

    constructor(color: Colors, cell: Cell) {
        super(color, cell);

        this.name = FiguresNames.KING;
        this.logo = color === Colors.WHITE ? whiteKingLogo : blackKingLogo;
    }

    canMove(target: Cell): boolean {

        const condition = target.color === Colors.BLACK
            && !target.figure
            && Math.abs(target.y - this.cell.y) === Math.abs(target.x - this.cell.x);

        return condition;
    }
}