import { ReactNode } from 'react';
import { GridStyles } from './gird.styles';

type GridPropsType = {
    children: ReactNode[] | ReactNode
}

function Grid(props: GridPropsType) {
    return (
        <GridStyles
            sizeOfElement={25}
        >
            {props.children}
        </GridStyles>
    );
}

export default Grid;