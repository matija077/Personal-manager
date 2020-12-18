import RootActionTypes, { RootAction } from './test-reducer.types';

export function changeTest(text: string): RootAction  {
    return {
        type: RootActionTypes.CHANGE_TEST,
        payload: text
    }
}