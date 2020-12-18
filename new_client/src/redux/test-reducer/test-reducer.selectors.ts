import { RootState } from './test-reducer.types'

export function getTestState(rootState: RootState): string {
    return rootState.testState;
}

export function getUseless(rootState: RootState): any {
    return rootState.useless;
}