import {Cell} from "./Cell";
import {Colors} from "./Colors";
import {Man} from "./figures/Man";
import {getRandomFromTo, getTransitCoordinates} from "../utilites/functions";
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

    public getCellAutoMove(order: Colors, level: Level): Array<Cell> {
        let selectedCell = null as null | Cell;
        let targetCell = null as null | Cell;

        const allCells = this.getAllCells();
        const myCellsFigure = allCells.filter(cell => cell.figure?.color === order);
        const myCellsForward = myCellsFigure.filter(cell => cell.isForward);

        console.log('myCellsForward.length', myCellsForward.length);

        if (myCellsForward.length) {
            const randomIndex = myCellsForward.length > 1
                ? getRandomFromTo(0, myCellsForward.length - 1)
                : 0;
            selectedCell = myCellsForward[randomIndex];
            console.log('randomIndex', randomIndex);

            this.getCellAvailable(selectedCell);
            const availableCells = this.getAllCells().filter(cell => cell.isAvailable);
            console.log('available.length', availableCells.length)

            targetCell = availableCells.length > 1
                ? availableCells[getRandomFromTo(0, availableCells.length - 1)]
                : availableCells[0];

        } else {
            const myCellsFigureCanMove = myCellsFigure.filter(cell => allCells.some(target => cell.figure?.canMove(target)));
            const index = myCellsFigureCanMove.length > 1
                ? getRandomFromTo(0, myCellsFigureCanMove.length - 1)
                : 0;
            selectedCell = myCellsFigureCanMove[index];

            this.getCellAvailable(selectedCell);
            const availableCells = allCells.filter(cell => cell.isAvailable);

            targetCell = availableCells.length > 1
                ? availableCells[getRandomFromTo(0, availableCells.length - 1)]
                : availableCells[0];
        }
        // alert(`${selectedCell?.x} ${selectedCell?.y}`);
        // alert(`${targetCell?.x} ${targetCell?.y}`);

        if (selectedCell && targetCell) {
            return [selectedCell, targetCell];
        } else {
            return [];
        }
    }

}