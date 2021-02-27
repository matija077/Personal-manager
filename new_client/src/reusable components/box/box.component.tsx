import * as React from 'react';

type BoxPropsType = {
    width?: string;
};

type BoxStateType = {
    width: string;
};

class Box extends React.Component<BoxPropsType, BoxStateType> {
    constructor(props: BoxPropsType) {
        super(props);

        this.state = {
            width: this.props.width ? "inital"
        };
    }

    private updateState<T>(key: string, value: T) {
        this.setState((state) =>  {
            return {
                ...state,
                [key]: value
            }
        })
    }

    protected getWidth() {
        return this.state.width;
    }
    protected setWidth(width: string) {
        this.updateState("width", width);
    }   
}

export default Box;