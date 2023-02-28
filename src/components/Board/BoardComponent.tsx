import React, {FC, useEffect, useState} from 'react';
import s from './BoardComponent.module.scss';
import {Board} from "../../models/Board";
import {v1} from "uuid";
import {CellComponent} from "./Cell/CellComponent";
import {Cell} from "../../models/Cell";
import {Colors} from "../../models/Colors";

interface BoardPropsType {
    board: Board
    setBoard: (board: Board) => void
}

export const BoardComponent: FC<BoardPropsType> = ({board, setBoard}) => {

    const updateBoard = () => {
        let updatedBoard = board.getCopyBoard();
        setBoard(updatedBoard);
    }

    const [selectedCell, setSelectedCell] = useState<null | Cell>(null);


    const cellOnClickHandler = (cell: Cell) => {
        // select figure
        // if (cell.figure?.color === Colors.BLACK) {
        //     setSelectedCell(cell);
        // }
        cell.figure && setSelectedCell(cell);


        // move to target cell
        if (cell.isAvailable) {
            let figure = selectedCell?.figure;
            selectedCell?.moveFigure(cell);
            setSelectedCell(null);
        }
    };
    const getCellAvailable = () => {
        board.getCellAvailable(selectedCell);
        updateBoard();
    };

    const getCellDanger = () => {
        board.getCellDanger(selectedCell);
        updateBoard();
    }

    useEffect(() => {
        getCellAvailable();
        getCellDanger();
    }, [selectedCell]);

    const cellsToRender = board.cells.map(row =>
        <React.Fragment key={v1()}>
            {row.map(cell => <CellComponent
                key={cell.id}
                cell={cell}
                isSelected={selectedCell === cell}
                cellOnClick={cellOnClickHandler}
            />)}
        </React.Fragment>
    );

    // arrays for app
    // const lettersArr = ['', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', ''];
    // const numbersArr = [1, 2, 3, 4, 5, 6, 7, 8];

    // arrays for development
    const lettersArr = ['', '0', '1', '2', '3', '4', '5', '6', '7', ''];
    const numbersArr = [7, 6, 5, 4, 3, 2, 1, 0];

    const lettersToRender = lettersArr.map((l, index) => <div key={index}>{l}</div>);
    const numbersToRender = numbersArr.map((num, index) => <div key={index}>{num}</div>);

    return (
        <div className={s.boardWrapper}>
            <div className={s.lettersRow}>{lettersToRender}</div>
            <div className={s.mainRowWrapper}>
                <div className={s.numbersWrapper}>{numbersToRender}</div>
                <div className={s.cellsWrapper}>
                    {cellsToRender}
                </div>
                <div className={s.numbersWrapper}>{numbersToRender}</div>
            </div>
            <div className={s.lettersRow}>{lettersToRender}</div>
        </div>
    );
};