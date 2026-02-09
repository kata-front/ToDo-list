import { useMemo } from "react"
import type { statesOfTasks, Task } from "../utils/types"

export const useStats = (tasks: Task[]): statesOfTasks => {
    return useMemo(() => {
        const total = tasks.length
        const done = tasks.filter(task => task.done).length
        const active = total - done
        const progress = total === 0 ? 0 : Math.round((done / total) * 100)
    
        return { total, done, active, progress }
    }, [tasks])
}