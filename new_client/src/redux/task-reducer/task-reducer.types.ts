export type TaskState = {
    tasks: Array<Task>
}

export type Task = {
    name: String
    description?: String,
    category: String,
    location?: String
}

const TaskActionTypes = {
    CLEAR_TASKS: "CLEAR_TASKS"
}

export default TaskActionTypes;