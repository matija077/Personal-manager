import { TaskState } from './task-reducer.types';

export function getTasks(state: TaskState) {
    return state.tasks

}

export function getTaskByName(name: string) {
    return function getTaskByName(state: TaskState) {
        state.tasks.find(task => {
            return task.name === name;
        })
    }
}