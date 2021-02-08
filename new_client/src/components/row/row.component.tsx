import { RowStyles } from './row.styles';
import React from 'react';

type RowPropsType = {
    children: React.ReactNode[] | React.ReactNode
}

function Row(props: RowPropsType) {
    return (
        <RowStyles>
            {props.children}
        </RowStyles>
    );
}

export default Row;