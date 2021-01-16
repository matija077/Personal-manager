import TaskActionTypes, {
    TaskState
} from './task-reducer.types';
import { ActionType } from '../root-reducer';

var initialState: TaskState = {
    tasks: []
}

type taskReducerActionMapType = {
    [action: string]: (state: TaskState) => TaskState,
}

const taskReducerActionMap: taskReducerActionMapType = {
    [TaskActionTypes.CLEAR_TASKS]: function(state) {
        return {
            ...initialState
        };
    }
}

function taskReducer(
    state: TaskState = initialState,
    action: ActionType)
:TaskState {
    var newState = taskReducerActionMap[action.type] ?
        taskReducerActionMap[action.type](state)
    :
        state
    ;

    return newState;
}

export default taskReducer;