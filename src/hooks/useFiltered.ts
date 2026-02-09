import { useMemo } from "react";
import type { Filters, Task } from "../utils/types";

export const useFilteredTasks = (tasks: Task[], filter: Filters): Task[] => {
    return useMemo(() => {
        switch (filter) {
            case 'active':
                return tasks.filter(task => !task.done)
            case "done":
                return tasks.filter(task => task.done) 
            default: 
                return tasks
        }
    }, [tasks, filter])
}