import {Cell} from "./Cell";
import {Colors} from "./Colors";
import {Man} from "./figures/Man";

export class Board {
    cells: Array<Array<Cell>> = [];

    public initCells() {
        for (let y = 0; y < 8; y++) {
            const row: Array<Cell> = [];

            for (let x = 0; x < 8; x++) {
                (y + x) % 2
                    ? row.push(new Cell(this, x, y, Colors.BLACK, null))
                    : row.push(new Cell(this, x, y, Colors.WHITE, null));
            }

            this.cells.push(row);
        }
    }

    public getCell(x: number, y: number): Cell {
        return this.cells[y][x];
    }

    public addFigures() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 4; j++) {
                new Man(Colors.WHITE, this.getCell(j * 2 + +!(i % 2), i));
                new Man(Colors.BLACK, this.getCell(j * 2 + +!!(i % 2), 7 - i));
            }
        }
    }

    public getCopyBoard(): Board {
        const newBoard = new Board();
        newBoard.cells = this.cells;
        return newBoard;
    }

    public getCellAvailable(selectedCell: Cell | null) {
        for (let i = 0; i < this.cells.length; i++) {
            const row = this.cells[i];
            for (let j = 0; j < row.length; j++) {
                const target = row[j];
                target.isAvailable = !!selectedCell?.figure?.canMove(target);
            }
        }
    }

    public getCellDanger(selectedCell: Cell | null) {
        for (let i = 0; i < this.cells.length; i++) {
            const row = this.cells[i];
            for (let j = 0; j < row.length; j++) {
                const target = row[j];
                target.isDanger = !!selectedCell?.figure?.canCrush(target, this);
            }
        }
    }

}