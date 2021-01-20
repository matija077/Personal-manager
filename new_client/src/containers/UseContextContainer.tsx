import { useContext, useLayoutEffect, useState } from 'react';

import Spinner from '../components/spinner/spinner.component';

import { contextType  } from '../graphQL/types';
import { useError } from '../utility/customHooks.utils';

enum PossibleStates  {
    "begining",
    "loading",
    "error"
}

type UseContextContainerPropsType = {
    context: any,
    timeBeforeLoading: number,
    errorTime: number,
    positionFixed: boolean
}

function useContextContainer(Component: JSX.Element) {
    /*return function UseContextContainer({
        context,
        timeBeforeLoading,
        errorTime,
        positionFixed
    }: UseContextContainerPropsType) {
        var contextReturnObject: contextType<unknown> = useContext(context);
        var [possibleStates, setPossibleStates]: [PossibleStates, Function] = useState<PossibleStates>(PossibleStates.begining);
        var [error, setError] = useError();

        useLayoutEffect(() => {
            setTimeout(() => {
                setPossibleStates(PossibleStates.loading);
            }, timeBeforeLoading)

            setTimeout(() => {
                setPossibleStates(PossibleStates.error);
            }, errorTime)
        }, [])

        // TODO - call warning component
        if (possibleStates === PossibleStates.error && contextReturnObject?.loading) {
            setError("errrrorrr");
        }

        return (
            <>
                {
                    possibleStates === PossibleStates.loading && contextReturnObject?.loading ?
                        <Spinner
                            positionFixed={positionFixed}
                        >
                        </Spinner>
                    :
                        <Component
                            data={contextReturnObject?.data}
                        >
                        </Component>
                }
            </>
        );
    }*/
}

export default useContextContainer;

// home page - render(component)

// container - render(component) => { UseContextCOntainer(compoent)(context)}