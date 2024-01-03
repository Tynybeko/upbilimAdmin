import React, { InputHTMLAttributes, ReactNode, useEffect, useRef, useState } from 'react';
import Styles from '../../styles/UI.module.scss'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    children?: ReactNode;
}

export default function Input({ children, ...attr }: InputProps) {



    return (
        <label className={Styles["input--field"]}>
            {children}
            <input  {...attr} />
        </label>
    );
}
