import type { Task } from "./types";

const addTask = (tasks: Task[], newTask: Task): Task[] => {
    return [
        ...tasks,
        newTask
    ]
}

const toggleTask = (tasks: Task[], taskId: number) => {
    return tasks.map(t => 
        t.id === taskId ? {...t, done: !t.done} : t
    )
}

const deleteTask = (tasks: Task[], taskId: number) => {
    return tasks.filter(t => t.id !== taskId)
}

const clear_Compiled = (tasks: Task[]) => {
    return tasks.filter(task => !task.done)
}

export {addTask, toggleTask, deleteTask, clear_Compiled}