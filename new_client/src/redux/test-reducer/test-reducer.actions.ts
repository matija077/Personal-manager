import RootActionTypes from './test-reducer.types';
import { ActionType } from '../root-reducer';

export function changeTest(text: string): ActionType  {
    return {
        type: RootActionTypes.CHANGE_TEST,
        payload: text
    }
}