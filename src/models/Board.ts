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

    public getCount(): Array<number> {
        let whiteCount = 0;
        let blackCount = 0;
        this._cells.forEach(raw => {
            raw.forEach(cell => {
                cell.figure?.color === Colors.WHITE && whiteCount++;
                cell.figure?.color === Colors.BLACK && blackCount++;
            })
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
        for (let i = 0; i < this._cells.length; i++) {
            const row = this._cells[i];
            for (let j = 0; j < row.length; j++) {
                const target = row[j];
                target.isAvailable = !!selectedCell?.figure?.canMove(target, this);
            }
        }
    }

    public getCellDanger(selectedCell: Cell | null) {
        for (let i = 0; i < this._cells.length; i++) {
            const row = this._cells[i];
            for (let j = 0; j < row.length; j++) {
                const target = row[j];
                target.isDanger = !!selectedCell?.figure?.canCrush(target, this);
            }
        }
    }

    public getCellForward(order: Colors) {
        for (let y = 0; y < this._cells.length; y++) {
            let row = this._cells[y];
            for (let x = 0; x < row.length; x++) {
                const currentCell = row[x];
                if (currentCell.figure?.color === order) {
                    const allCells = this._cells.flat();
                    const isForward = allCells.some(cell => currentCell.figure?.canCrush(cell, this));
                    currentCell.isForward = isForward;
                } else {
                    currentCell.isForward = false;
                }
            }
        }
    }

}