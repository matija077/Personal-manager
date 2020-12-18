import RootActionTypes, { RootState, RootAction } from './test-reducer.types'

var initialState: RootState  = {
    testState: "",
    useless: null
}

function testReducer(state: RootState = initialState, action: RootAction): RootState {
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