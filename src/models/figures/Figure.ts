import {Colors} from "../Colors";
import whiteManLogo from '../../assets/images/white-man.png';
import {Cell} from "../Cell";
import {v1} from "uuid";

export enum FiguresNames {
    FIGURE = 'figure',
    MAN = 'man',
    KING = 'king',
}

export class Figure {
    id: string;
    name: FiguresNames
    color: Colors;
    cell: Cell;
    logo: typeof whiteManLogo | null;


    constructor(color: Colors, cell: Cell) {
        this.id = v1();
        this.color = color;
        this.cell = cell;
        this.cell.figure = this;
        this.logo = null;
        this.name = FiguresNames.FIGURE;
    }

    canMove(target: Cell): boolean {
        return true;
    }

    moveFigure(target: Cell) {
        this.cell = target;
    }
}