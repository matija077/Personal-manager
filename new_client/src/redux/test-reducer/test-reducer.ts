import TestActionTypes, { TestState } from './test-reducer.types'
import { ActionType } from '../root-reducer';

var initialState: TestState  = {
    testState: "TEST",
    useless: true
}

function testReducer(state: TestState = initialState, action: ActionType): TestState {
    switch (action.type) {
        case TestActionTypes.CHANGE_TEST:
            return {
                ...state,
                testState: action.payload
            }
        default:
            return state;
    }
}

export default testReducer;