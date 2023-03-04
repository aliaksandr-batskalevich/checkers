import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react';
import s from './Button.module.scss';

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

type IPropsType = {
    title: string
};

export const Button: React.FC<IPropsType & DefaultButtonPropsType> = ({title, className, ...restProps}) => {

    const rootClassName = `${className} ${s.button}`;

    return (
        <button className={rootClassName} {...restProps}>
            {title}
        </button>
    );
};