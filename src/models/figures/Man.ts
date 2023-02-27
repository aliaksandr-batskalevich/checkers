import {Figure, FiguresNames} from "./Figure";
import {Colors} from "../Colors";
import {Cell} from "../Cell";
import whiteManLogo from '../../assets/images/white-man.png';
import blackManLogo from '../../assets/images/black-man.png';


export class Man extends Figure {

    constructor(color: Colors, cell: Cell) {
        super(color, cell);

        this.name = FiguresNames.MAN;
        this.logo = color === Colors.WHITE ? whiteManLogo : blackManLogo;
    }

    canMove(target: Cell): boolean {

        const conditionWhite = (!target.figure || target.figure.color === Colors.BLACK)
            && target.y === this.cell.y + 1;

        const conditionBlack = (!target.figure || target.figure.color === Colors.WHITE)
            && target.y === this.cell.y - 1;

        const colorCondition = this.color === Colors.WHITE
            ? conditionWhite
            : conditionBlack;

        const condition = target.color === Colors.BLACK
            && colorCondition
            && Math.abs(target.x - this.cell.x) === 1;

        return condition;
    }


}