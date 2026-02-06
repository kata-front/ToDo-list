import { useEffect, useState } from "react"
import { controlledTasks } from "../utils/storageController"
import type { Task } from "../utils/types"
import { addTask, deleteTask, toggleTask } from "../utils/tasksFunc"

export const useTasks = () => {
    const [tasks, setTasks] = useState<Task[]>(controlledTasks.load())

    useEffect(() => {
        controlledTasks.save(tasks)
    }, [tasks])

    return {
        tasks: tasks,

        add(text: string): void {
            setTasks(prev => addTask(prev, {
                id: Date.now(),
                text: text,
                done: false,
                createdAt: new Date().toDateString()
            }))
        },

        toggle(taskId: number): void {
            setTasks(prev => toggleTask(prev, taskId))
        },

        deleted(taskId: number): void {
            setTasks(prev => deleteTask(prev, taskId))
        }
    }
}