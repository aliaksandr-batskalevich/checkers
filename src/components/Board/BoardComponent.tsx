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
        if (cell.available) {
            let figure = selectedCell?.figure;
            selectedCell?.moveFigure(cell);
            setSelectedCell(null);
        }
    };
    const getCellAvailable = () => {
        board.getCellAvailable(selectedCell);
        updateBoard();
    };

    useEffect(() => {
        getCellAvailable();
    }, [selectedCell]);

    const boardToRender = board.cells.map(row =>
        <React.Fragment key={v1()}>
            {row.map(cell => <CellComponent
                key={cell.id}
                cell={cell}
                isSelected={selectedCell === cell}
                cellOnClick={cellOnClickHandler}
            />)}
        </React.Fragment>
    );

    return (
        <div className={s.boardWrapper}>
            {boardToRender}
        </div>
    );
};