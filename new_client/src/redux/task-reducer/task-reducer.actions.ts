import { ActionType } from '../root-reducer';
import TaskActionTypes from './task-reducer.types';

export function clearTasks(): ActionType {
    return {
        type: TaskActionTypes.CLEAR_TASKS,
    }
}