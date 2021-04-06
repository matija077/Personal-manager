import { useEffect } from 'react';

type MainPropsType = {
    children: JSX.Element
}


function Main({ children }: MainPropsType) {


    return (
        {...children}
    );

}

export default Main;
