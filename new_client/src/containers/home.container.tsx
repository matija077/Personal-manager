import React from 'react';

type HomeContainerPropsType = {
    WrappedComponent: React.FunctionComponent,
    children: never[]
}

function withHomePage<T>({ WrappedComponent }: HomeContainerPropsType ) {
    return function WithHomePage(props: Array<T>) {

        return (
            <WrappedComponent>
                {...props}
            </WrappedComponent>
        )
    }
}

export default withHomePage;