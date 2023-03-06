import React from 'react';
import s from './StartMessage.module.scss';
import commonStyle from '../Messages.module.scss';
import {GameType, Level, setGameType, setInitApp, setLevel} from "../../../bll/appReducer";
import {useDispatch, useSelector} from "react-redux";
import {useFormik} from "formik";
import {getGameType, getLevel} from "../../../bll/selectors";
import {Button} from "../../commons/Button/Button";
import {v1} from "uuid";


export const StartMessage = () => {

    const dispatch = useDispatch();
    const gameType = useSelector(getGameType);
    const level = useSelector(getLevel)


    const setStartSettings = (gameType: GameType, level: Level) => {
        dispatch(setGameType(gameType));
        dispatch(setLevel(level));
        dispatch(setInitApp(true));
    };


    type valuesType = {
        gameType: GameType
        level: Level
    }

    const formikInitialValues: valuesType = {
        gameType: gameType,
        level: level,
    };

    const formik = useFormik({
        initialValues: formikInitialValues,
        onSubmit(values) {
            setStartSettings(values.gameType, values.level);
        }
    });

    const radioLevelsToRender = [Level.LOW, Level.MIDDLE, Level.HIGH].map(level => <span key={v1()} className={s.radioElement}>
        <input
            id={level}
            type='radio'
            name='level'
            value={level}
            onChange={formik.handleChange}
            checked={formik.values.level === level}
            // can be changing after create logic for levels
            disabled={level === Level.HIGH}
        />
        <label htmlFor={level}>{level}</label>
    </span>);

    const rootClassNameWrapper = `${s.startMessageWrapper} ${commonStyle.messageWrapper}`

    return (
        <div className={rootClassNameWrapper}>
            <h2>Welcome! Set up the game.</h2>
            <form onSubmit={formik.handleSubmit}>
                <div className={s.gameTypeWrapper}>
                    <label htmlFor='one'>Select type of game</label>
                    <select
                        id='one'
                        name='gameType'
                        value={formik.values.gameType}
                        onChange={formik.handleChange}
                    >
                        <option value={GameType.ONE}>one player</option>
                        <option value={GameType.TWO}>two players</option>
                    </select>
                </div>

                <div className={s.levelHeightWrapper}>
                    {formik.values.gameType === GameType.ONE && <div className={s.levelWrapper}>
                        <label>Select level</label>
                        {radioLevelsToRender}
                    </div>}
                </div>
                <Button title={'Start the game'} type='submit'/>
            </form>
        </div>
    );
};