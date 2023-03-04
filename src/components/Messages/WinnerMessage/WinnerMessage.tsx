import React from 'react';
import commonStyle from '../Messages.module.scss';
import {Colors} from "../../../models/Colors";
import {useDispatch} from "react-redux";
import {setInitApp} from "../../../bll/appReducer";
import {Button} from "../../commons/Button/Button";

type WinnerMessagePropsType = {
    winner: Colors
    restartGame: () => void
}

export const WinnerMessage: React.FC<WinnerMessagePropsType> = ({winner, restartGame}) => {

    const dispatch = useDispatch();

    const gameSetUpHandler = () => {
        dispatch(setInitApp(false));
    };

    return (
        <div className={commonStyle.messageWrapper}>
            <h2>{`${winner.toUpperCase()} won!`}</h2>
            <Button title={'Restart the game'} onClick={restartGame}/>
            <Button title={'Set up the game'} onClick={gameSetUpHandler}/>
        </div>
    );
};