import React, {useEffect} from 'react';
import s from './App.module.scss';
import {BoardComponent} from "./components/Board/BoardComponent";
import {Board} from "./models/Board";
import {useDispatch, useSelector} from "react-redux";
import {setBoard} from "./bll/boardReducer";
import {setCount, setIsWinner, setOrder, setStatus, Status} from "./bll/appReducer";
import {Colors} from "./models/Colors";
import {ScoreBoard} from "./components/ScoreBoard/ScoreBoard";
import {getCount, getGameType, getIsAppInit, getIsWinner, getOrder} from "./bll/selectors";
import {WinnerMessage} from "./components/Messages/WinnerMessage/WinnerMessage";
import {StartMessage} from "./components/Messages/StartMessage/StartMessage";

function App() {

    const gameType = useSelector(getGameType);
    const isAppInit = useSelector(getIsAppInit);
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

    const setWinnerHandler = (winner: Colors) => {
        dispatch(setIsWinner(winner));
    };

    useEffect(() => {
        !isAppInit && restartGame();
    }, [isAppInit]);

    useEffect(() => {
        count[0] === 0 && setWinnerHandler(Colors.BLACK);
        count[1] === 0 && setWinnerHandler(Colors.WHITE);
    }, [count[0], count[1]]);

    const contentWinnerWrapperClassName = isWinner || !isAppInit ? s.contentBlur : '';

    return (
        <div className={s.appWrapper}>
            <div className={`${s.contentWrapper} ${contentWinnerWrapperClassName}`}>
                <ScoreBoard
                    gameType={gameType}
                    color={Colors.WHITE}
                    order={order}
                    count={count}
                    setWinner={setWinnerHandler}
                />
                <BoardComponent/>
                <ScoreBoard
                    gameType={gameType}
                    color={Colors.BLACK}
                    order={order}
                    count={count}
                    setWinner={setWinnerHandler}
                />
            </div>
            {isWinner && <WinnerMessage winner={isWinner} restartGame={restartGame}/>}
            {!isAppInit && <StartMessage/>}
        </div>
    );
}

export default App;
