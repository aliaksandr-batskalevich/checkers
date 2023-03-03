import {Cell} from "./Cell";
import {Colors} from "./Colors";
import {Man} from "./figures/Man";
import {getTransitCoordinates, randomIndexMaker} from "../utilites/functions";
import {Level} from "../bll/appReducer";


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

        this.getCellDanger(selectedCell);

        if (forwards.length && selectedCell) {
            allCells.forEach(cell => {

                let isAvailable = !!selectedCell?.figure?.canMove(cell);

                if (isAvailable) {
                    const transitCells = getTransitCoordinates(selectedCell, cell).map(coordinate => {
                        const [x, y] = coordinate;
                        return this.getCell(x, y);
                    });
                    cell.isAvailable = transitCells.some(transitCell => transitCell.isDanger);
                } else {
                    cell.isAvailable = false;
                }

            });
        } else {

            allCells.forEach(cell => {
                cell.isAvailable = !!selectedCell?.figure?.canMove(cell);
            });

        }
    }

    public getCellDanger(selectedCell: Cell | null) {
        this.getAllCells()
            .forEach(cell => {
                cell.isDanger = !!selectedCell?.figure?.canCrush(cell);
            });
    }

    public getCellForward(order: Colors) {
        this.getAllCells()
            .forEach((cell, i, arr) => {
                if (cell.figure?.color === order) {
                    const isForward = arr.some(c => cell.figure?.canCrush(c));
                    cell.isForward = isForward;
                } else {
                    cell.isForward = false;
                }
            });
    }

    public getCellAutoMove(color: Colors, level: Level, crushingCell: Cell | null): Array<Cell> {
        let selectedCell = null as null | Cell;
        let targetCell = null as null | Cell;

        const allCells = this.getAllCells();
        const myCellsFigure = allCells.filter(cell => cell.figure?.color === color);
        const freeCell = allCells.filter(cell => !cell.figure);
        const myCellsForward = myCellsFigure.filter(cell => cell.isForward);

        if (crushingCell) {
            selectedCell = crushingCell;
        } else if (myCellsForward.length) {
            selectedCell = myCellsForward[randomIndexMaker(myCellsForward.length - 1)];
        } else {
            const myCellsFigureCanMove = myCellsFigure.filter(myCellFigure => freeCell.some(target => myCellFigure.figure?.canMove(target)));
            selectedCell = myCellsFigureCanMove[randomIndexMaker(myCellsFigureCanMove.length - 1)];
        }
        this.getCellAvailable(selectedCell);
        const availableCells = allCells.filter(cell => cell.isAvailable);

        targetCell = availableCells[randomIndexMaker(availableCells.length - 1)];

        // alert(`${selectedCell?.x} ${selectedCell?.y} - ${targetCell?.x} ${targetCell?.y} ${myCellsForward.length > 0}`);

        if (selectedCell && targetCell) {
            return [selectedCell, targetCell];
        } else {
            return [];
        }
    }

}