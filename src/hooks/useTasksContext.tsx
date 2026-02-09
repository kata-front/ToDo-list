import { createContext, useContext, type ReactElement } from "react";
import type { TasksContextType } from "../utils/types";
import { useTasks } from "./useTasksReducer";

export const TasksContext = createContext<TasksContextType | null>(null)

export const TaskProvider = ({children}: {children: ReactElement}) => {
    const value = useTasks()

    return (
        <TasksContext.Provider value={value}>
            {children}
        </TasksContext.Provider>
    )
}

export const useTaskContext = (provider: React.Context<TasksContextType | null>) => {
    const value = useContext(provider)
    
    if (!value) {
        throw new Error('Error with context')
    }

    return value
}