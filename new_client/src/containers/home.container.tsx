import React from 'react';

import { useSelector } from 'react-redux';
import { getTasks } from '../redux/task-reducer/task-reducer.selectors';

type withHomePagePropsType = {
    //currentProp: String
}



type withHomePageIntersectionTPropsType<T> = withHomePagePropsType & T;

function withHomePage<T>( WrappedComponent: React.ComponentType<T>) {
    return function WithHomePage(props: withHomePageIntersectionTPropsType<T>) {
        const tasks = useSelector(getTasks);
        console.log(tasks);

        //var {currentProp, ...rest} = props;
        var {...rest} = props;

        return (
            <WrappedComponent
                {...rest as unknown as T}
            >
            </WrappedComponent>
        )
    }
}

export default withHomePage;