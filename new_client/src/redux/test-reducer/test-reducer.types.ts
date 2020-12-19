export interface TestState {
    testState: string,
    useless: any
}

export interface RootAction {
    type: string,
    payload: any
}

var RootActionTypes = {
    CHANGE_TEST: "CHANGE_TEST"
}

export default RootActionTypes;