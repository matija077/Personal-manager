import { TaskState } from './task-reducer.types';
import { silentRefresh } from '../utils';

export function getTasks(state: TaskState) {
    silentRefresh();
    return state.tasks

}

export function getTaskByName(name: string) {
    return function getTaskByName(state: TaskState) {
        state.tasks.find(task => {
            return task.name === name;
        })
    }
}