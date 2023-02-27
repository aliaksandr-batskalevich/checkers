import React, {useEffect, useState} from 'react';
import s from './App.module.scss';
import {BoardComponent} from "./components/Board/BoardComponent";
import {Board} from "./models/Board";

function App() {
    useEffect(() => {
        restart();
    }, []);

    const [board, setBoard] = useState(new Board());

    const restart = () => {
        const newBoard = new Board();
        newBoard.initCells();
        newBoard.addFigures();
        setBoard(newBoard);
    };

  return (
    <div className={s.appWrapper}>
      <BoardComponent board={board} setBoard={setBoard}/>
    </div>
  );
}

export default App;
