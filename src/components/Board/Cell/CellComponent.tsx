import React, {FC} from 'react';
import s from './CellComponent.module.scss';
import {Cell} from "../../../models/Cell";
import {Colors} from "../../../models/Colors";

interface CellComponentPropsType {
    cell: Cell
    isSelected: boolean

    cellOnClick: (cell: Cell) => void
}

export const CellComponent: FC<CellComponentPropsType> = ({cell, isSelected, cellOnClick}) => {

    const cellOnClickHandler = () => {
        cellOnClick(cell);
    };

    const colorClassName = isSelected
        ? s.selected
        : cell.available && cell.figure
            ? s.crush
            : cell.color === Colors.WHITE
                ? s.white
                : s.black;
    const selectedClassName = isSelected ? s.selected : '';
    const rootClassName = `${s.cellWrapper} ${colorClassName} ${selectedClassName}`;

    const isAvailable = !cell.figure && cell.available;

    const figure = cell.figure?.logo ? <img src={cell.figure.logo} alt="figure"/> : null;

    return (
        <div className={rootClassName} onClick={cellOnClickHandler}>
            {isAvailable && <div className={s.available}/>}
            {figure}
        </div>
    );
};