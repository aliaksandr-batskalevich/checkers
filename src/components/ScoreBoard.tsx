import React from 'react';
import s from './ScoreBoard.module.scss';
import {Colors} from "../models/Colors";

interface ScoreBoardProps {
    color: Colors
    order: Colors
    count: Array<number>
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({color, order, count}) => {

    const countToRender = color === Colors.WHITE ? count[0] : count[1];
    const textColorClassName = color === Colors.WHITE ? s.whiteText : s.blackText;
    const activeBorderClassName = color === order && color === Colors.WHITE
        ? s.activeWhiteBorder
        : color === order && color === Colors.BLACK
            ? s.activeBlackBorder
            : '';

    return (
        <div className={s.scoreBoardWrapper}>
            <div className={`${s.titleWrapper} ${activeBorderClassName}`}>
                <h2 className={textColorClassName}>{color.toUpperCase()}</h2>
            </div>
            <div className={s.scoreWrapper}>
                <p className={textColorClassName}>{`You have ${countToRender} figures`}</p>
            </div>
        </div>
    );
};