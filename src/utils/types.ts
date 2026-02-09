export type Task = {
    id: number
    text: string
    done: boolean
    createdAt: string
}

export type PropsForTaskComponent = {
    task: Task
}

export type Filters = 'all' | 'active' | 'done'

export type statesOfTasks = Record<'total' | 'done' | 'active' | 'progress', number>

export type TasksContextType = {
    state: Task[];
    add(text: string): void;
    toggle: (taskId: number) => void;
    deleted: (taskId: number) => void;
    clear_compiled(): void;
}