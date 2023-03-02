import {Cell} from "./Cell";
import {Colors} from "./Colors";
import {Man} from "./figures/Man";

export class Board {
    _cells: Array<Array<Cell>> = [];

    public initCells() {
        for (let y = 0; y < 8; y++) {
            const row: Array<Cell> = [];

            for (let x = 0; x < 8; x++) {
                (y + x) % 2
                    ? row.push(new Cell(this, x, y, Colors.BLACK, null))
                    : row.push(new Cell(this, x, y, Colors.WHITE, null));
            }

            this._cells.push(row);
        }
    }

    public getCell(x: number, y: number): Cell {
        return this._cells[y][x];
    }

    public getAllCells() {
        return this._cells.flat();
    }

    public getCount(): Array<number> {
        let whiteCount = 0;
        let blackCount = 0;
        this.getAllCells()
            .forEach((cell) => {
                cell.figure?.color === Colors.WHITE && whiteCount++;
                cell.figure?.color === Colors.BLACK && blackCount++;
            })

        return [whiteCount, blackCount];
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
        newBoard._cells = this._cells;
        return newBoard;
    }

    public getCellAvailable(selectedCell: Cell | null) {
        const allCells = this.getAllCells();
        const forwards = allCells.filter(cell => cell.isForward);

        if (forwards.length) {

        } else {

        }

        allCells.forEach(cell => {
            cell.isAvailable = !!selectedCell?.figure?.canMove(cell, this);
        })

    }

    public getCellDanger(selectedCell: Cell | null) {
        this.getAllCells()
            .forEach(cell => {
                cell.isDanger = !!selectedCell?.figure?.canCrush(cell, this);
            });
    }

    public getCellForward(order: Colors) {
        this.getAllCells()
            .forEach((cell, i, arr) => {
                if (cell.figure?.color === order) {
                    const isForward = arr.some(c => cell.figure?.canCrush(c, this));
                    cell.isForward = isForward;
                } else {
                    cell.isForward = false;
                }
            });
    }

}