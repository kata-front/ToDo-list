import { useCallback, useEffect, useReducer } from "react"
import { controlledTasks } from "../utils/storageController"
import type { Task, TasksContextType } from "../utils/types"
import { addTask, deleteTask, toggleTask, clear_Compiled } from "../utils/tasksFunc"

export const useTasks = (): TasksContextType => {
    const [state, dispatch] = useReducer(
        (prev: Task[], action: {
            type: 'ADD' | 'TOGGLE' | 'DELETE' | 'CLEAR_COMPILED',
            payload?: number | Task
        }) => {
            switch (action.type) {
                case 'ADD':
                    return addTask(prev, action.payload as Task)
                case 'TOGGLE':
                    return toggleTask(prev, action.payload as number)
                case 'DELETE':
                    return deleteTask(prev, action.payload as number)
                case 'CLEAR_COMPILED':
                    return clear_Compiled(prev)
                default:
                    return prev;
            }
        },
        controlledTasks.load()
    );

    useEffect(() => {
        controlledTasks.save(state)
    }, [state])

    const toggle = useCallback((taskId: number) => {
        dispatch({ type: 'TOGGLE', payload: taskId })
    }, [])

    const deleted = useCallback((taskId: number) => {
        dispatch({ type: 'DELETE', payload: taskId })
    }, [])

    return {
        state,

        add(text: string) {
            const value = text.trim()
            if (!value) return

            dispatch({
                type: 'ADD', payload: {
                    done: false,
                    createdAt: new Date().toDateString(),
                    text: text,
                    id: Date.now()
                }
            })
        },
        toggle, deleted,
        // toggle(taskId: number) {
        //     dispatch({ type: 'TOGGLE', payload: taskId })
        // },

        // deleted(taskId: number) {
        //     dispatch({ type: 'DELETE', payload: taskId })
        // },

        clear_compiled() {
            dispatch({ type: 'CLEAR_COMPILED' })
        }
    }
};
