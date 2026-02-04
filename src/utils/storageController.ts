import {type Task} from "../utils/types";

export const controlledTasks = {
    save: (tasks: Task[]) => {
        localStorage.setItem('tasks', JSON.stringify(tasks))
    },
    load: (): Task[] => {
        const storedTasks = localStorage.getItem('tasks')
        return storedTasks ? JSON.parse(storedTasks) : []
    }
}