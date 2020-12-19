import rootReducer from '../root-reducer';
import { TestState } from './test-reducer.types'
import { RootState } from '../root-reducer';

function getTest(rootState: RootState): TestState {
    return rootState.test;
}

export function getTestState(rootState: RootState): string {
    return getTest(rootState).testState;
}

export function getUseless(rootState: RootState): any {
    return getTest(rootState).useless;
}