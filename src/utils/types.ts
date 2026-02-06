export type Task = {
    id: number
    text: string
    done: boolean
    createdAt: string
}

export type PropsForTaskComponent = {
    task: Task
    taskMutable: {
        toggle: (taskId: number) => void
        deleted: (taskId: number) => void
    }
}