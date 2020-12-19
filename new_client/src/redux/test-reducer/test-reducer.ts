import RootActionTypes, { TestState, RootAction } from './test-reducer.types'

var initialState: TestState  = {
    testState: "TEST",
    useless: true
}

function testReducer(state: TestState = initialState, action: RootAction): TestState {
    switch (action.type) {
        case RootActionTypes.CHANGE_TEST:
            return {
                ...state,
                testState: action.payload
            }
        default:
            return state;
    }
}

export default testReducer;