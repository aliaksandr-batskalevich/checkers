import React, {useEffect} from 'react';
import s from './App.module.scss';
import {BoardComponent} from "./components/Board/BoardComponent";
import {Board} from "./models/Board";
import {useDispatch} from "react-redux";
import {setBoard} from "./bll/boardReducer";
import {setCount, setInitApp, setOrder, setStatus, Status} from "./bll/appReducer";
import {Colors} from "./models/Colors";

function App() {

    useEffect(() => {
        restartGame();
        dispatch(setInitApp());
    }, []);

    const dispatch = useDispatch();

    const restartGame = () => {
        const newBoard = new Board();
        newBoard.initCells();
        newBoard.addFigures();
        const count = newBoard.getCount();

        dispatch(setCount(count));
        dispatch(setBoard(newBoard));
        dispatch(setOrder(Colors.BLACK));
        dispatch(setStatus(Status.WAIT));
    };

    return (
        <div className={s.appWrapper}>
            <BoardComponent/>
        </div>
    );
}

export default App;
