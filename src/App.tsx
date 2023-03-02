import React, {useEffect} from 'react';
import s from './App.module.scss';
import {BoardComponent} from "./components/Board/BoardComponent";
import {Board} from "./models/Board";
import {useDispatch, useSelector} from "react-redux";
import {setBoard} from "./bll/boardReducer";
import {setCount, setInitApp, setIsWinner, setOrder, setStatus, Status} from "./bll/appReducer";
import {Colors} from "./models/Colors";
import {ScoreBoard} from "./components/ScoreBoard";
import {getCount, getIsWinner, getOrder} from "./bll/selectors";

function App() {

    // warningMessage
    useEffect(() => {
        alert('готово правило "Бей обязательно!", сломал multiCrush, исправляю :)');
    }, []);


    const isWinner = useSelector(getIsWinner);
    const order = useSelector(getOrder);
    const count = useSelector(getCount);

    const dispatch = useDispatch();

    const restartGame = () => {
        const newBoard = new Board();
        newBoard.initCells();
        newBoard.addFigures();
        const count = newBoard.getCount();

        dispatch(setIsWinner(null));
        dispatch(setCount(count));
        dispatch(setBoard(newBoard));
        dispatch(setOrder(Colors.BLACK));
        dispatch(setStatus(Status.WAIT));
    };

    useEffect(() => {
        restartGame();
        dispatch(setInitApp());
    }, []);

    useEffect(() => {
        count[0] === 0 && dispatch(setIsWinner(Colors.BLACK));
        count[1] === 0 && dispatch(setIsWinner(Colors.WHITE));
    }, [count[0], count[1]]);

    const contentWinnerWrapperClassName = isWinner ? s.contentWinnerWrapper : '';

    return (
        <div className={s.appWrapper}>
            <div className={`${s.contentWrapper}  ${contentWinnerWrapperClassName}`}>
                <ScoreBoard color={Colors.WHITE} order={order} count={count}/>
                <BoardComponent/>
                <ScoreBoard color={Colors.BLACK} order={order} count={count}/>
            </div>
            {isWinner && <div className={s.messageWrapper}>
                <h2>{`${isWinner.toUpperCase()} won!`}</h2>
                <button onClick={restartGame}>Restart the game</button>
            </div>}
        </div>
    );
}

export default App;
