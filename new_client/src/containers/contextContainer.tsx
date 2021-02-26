import { useContext, useLayoutEffect, useState } from 'react';

import Spinner from '../components/spinner/spinner.component';

import { contextType  } from '../graphQL/types';
import { useError } from '../utility/hooks/customHooks.utils';

enum PossibleStates  {
    "begining",
    "loading",
    "error"
}

type ContextContainerPropsType = {
    context: any,
    timeBeforeLoading: number,
    errorTime: number,
    positionFixed: boolean
}

type ContextContainerPassingPropsType = {
    data: any
}

function contextContainer<T>(
    Component: React.ComponentType<typeof componentsProps & ContextContainerPassingPropsType>,
    componentsProps: any)
{
    return function ContextContainer({
        context,
        timeBeforeLoading,
        errorTime,
        positionFixed
    }: ContextContainerPropsType) {
        var contextReturnObject: contextType<unknown> = useContext(context);
        var [possibleStates, setPossibleStates]: [PossibleStates, Function] = useState<PossibleStates>(PossibleStates.begining);
        var [error, setError] = useError();

        useLayoutEffect(() => {
            const timeoutId1 = setTimeout(() => {
                setPossibleStates(PossibleStates.loading);
            }, timeBeforeLoading)

            const timeoutId2 = setTimeout(() => {
                setPossibleStates(PossibleStates.error);
            }, errorTime)

            return () => {
                clearTimeout(timeoutId1);
                clearTimeout(timeoutId2);
            }
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
                            {...componentsProps}
                        >
                        </Component>
                }
            </>
        );
    }
}

export default contextContainer;

// home page - render(component, props)

// container - render(component, props) => { UseContextCOntainer(compoent)(context)}