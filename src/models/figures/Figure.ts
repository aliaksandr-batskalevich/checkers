import {Colors} from "../Colors";
import whiteManLogo from '../../assets/images/white-man.png';
import {Cell} from "../Cell";
import {v1} from "uuid";
import {Board} from "../Board";

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
        return false;
    }

    moveFigure(target: Cell, board: Board) {

        // crush Figure
        const transitCells: Array<Array<number>> = [];
        const courseX = target.x - this.cell.x > 0 ? 1 : -1;
        const courseY = target.y - this.cell.y > 0 ? 1 : -1;
        for (let x = this.cell.x + courseX, y = this.cell.y + courseY;
             x !== target.x && y !== target.y;
             x = x + courseX, y = y + courseY) {
            transitCells.push([x, y]);
        }

        transitCells
            .map(coordinate => {
            let [x, y] = coordinate;
            return board.getCell(x, y);
        })
            .forEach(cell => {
            cell.figure?.unMount();
        });

        // move
        this.cell = target;
    }

    canCrush(target: Cell, board: Board): boolean {
        return false;
    }

    unMount() {
        this.cell.figure = null;
    }
}