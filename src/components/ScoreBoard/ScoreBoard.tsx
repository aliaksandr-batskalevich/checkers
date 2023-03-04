import React from 'react';
import s from './ScoreBoard.module.scss';
import {Colors} from "../../models/Colors";
import {GameType} from "../../bll/appReducer";
import {Button} from "../commons/Button/Button";

interface ScoreBoardProps {
    gameType: GameType
    color: Colors
    order: Colors
    count: Array<number>

    setWinner: (winner: Colors) => void
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({gameType, color, order, count, setWinner}) => {

    const countToRender = color === Colors.WHITE ? count[0] : count[1];
    const textColorClassName = color === Colors.WHITE ? s.whiteText : s.blackText;
    const activeBorderClassName = color === order && color === Colors.WHITE
        ? s.activeWhiteBorder
        : color === order && color === Colors.BLACK
            ? s.activeBlackBorder
            : '';

    const setWinnerHandler = () => {
        setWinner(color === Colors.WHITE ? Colors.BLACK : Colors.WHITE);
    };

    const giveUpButtonCondition = gameType === GameType.TWO || color === Colors.BLACK;
    const disabledButtonCondition = order !== color;

    return (
        <div className={s.scoreBoardWrapper}>
            <div className={`${s.titleWrapper} ${activeBorderClassName}`}>
                <h2 className={textColorClassName}>{color.toUpperCase()}</h2>
            </div>
            <div className={s.scoreWrapper}>
                <p className={textColorClassName}>{`You have ${countToRender} figures`}</p>
            </div>
            {giveUpButtonCondition
            && <Button title={'Give up'} onClick={setWinnerHandler} disabled={disabledButtonCondition}/>}
        </div>
    );
};