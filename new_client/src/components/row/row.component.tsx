import { RowStyles } from './row.styles';
import React from 'react';

type RowPropsType = {
    children: React.ReactNode[] | React.ReactNode,
    percantageLeft: number,
    percantageRight: number
}

function Row({ percantageLeft, percantageRight, children }: RowPropsType) {
    return (
        <RowStyles
                percantageLeft={percantageLeft}
                percantageRight={percantageRight}
        >
            {children}
        </RowStyles>
    );
}

export default Row;