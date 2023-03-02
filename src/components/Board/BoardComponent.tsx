import React, {useEffect} from 'react';
import s from './BoardComponent.module.scss';
import {v1} from "uuid";
import {CellComponent} from "./Cell/CellComponent";
import {Cell} from "../../models/Cell";
import {useDispatch, useSelector} from "react-redux";
import {getBoard, getCount, getForwards, getOrder, getSelectedCell, getStatus} from "../../bll/selectors";
import {setBoard} from "../../bll/boardReducer";
import {Colors} from "../../models/Colors";
import {setCount, setOrder, setSelectedCell, setStatus, Status} from "../../bll/appReducer";


export const BoardComponent = () => {

    const dispatch = useDispatch();

    const count = useSelector(getCount);
    const board = useSelector(getBoard);
    const order = useSelector(getOrder);
    const status = useSelector(getStatus);
    const selectedCell = useSelector(getSelectedCell);
    const forwards = useSelector(getForwards);

    const updateBoard = () => {
        let updatedBoard = board.getCopyBoard();
        let updatedCount = updatedBoard.getCount();
        if (count[0] + count[1] !== updatedCount[0] + updatedCount[1]) {
            dispatch(setCount(updatedCount));
            if (selectedCell?.isForward) {
                dispatch(setStatus(Status.CRUSH));
            } else {
                dispatch(setStatus(Status.WAIT));
                changeOrder();
            }
        } else if (status === Status.MOVE) {
            dispatch(setStatus(Status.WAIT));
            changeOrder();
        }
        dispatch(setBoard(updatedBoard));
    };


    const changeOrder = () => {
        let newOrder = order === Colors.BLACK ? Colors.WHITE : Colors.BLACK;
        dispatch(setOrder(newOrder));
        setSelectedCellHandler(null);
    };

    const setSelectedCellHandler = (cell: null | Cell) => {
        dispatch(setSelectedCell(cell));
    };

    const cellOnClickHandler = (cell: Cell) => {

        // select figures
        if (status === Status.WAIT && cell.figure?.color === order) {
            if (forwards.length) {
                forwards.includes(cell) && setSelectedCellHandler(cell);
            } else {
                setSelectedCellHandler(cell);
            }
        }

        // move to target cell
        if (cell.isAvailable) {
            selectedCell?.moveFigure(cell);
            setSelectedCellHandler(cell);
            dispatch(setStatus(Status.MOVE));
        }

    };

    const getCellForward = () => {
        board.getCellForward(order);
    };

    const getCellAvailable = () => {
        board.getCellAvailable(selectedCell);
    };

    const getCellDanger = () => {
        board.getCellDanger(selectedCell);
    };

    useEffect(() => {
        getCellAvailable();
        updateBoard();
    }, [selectedCell]);

    useEffect(() => {
        getCellForward();
        updateBoard();
    }, [order]);

    const cellsToRender = board._cells.map(row =>
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

    // markUpArrays for development
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