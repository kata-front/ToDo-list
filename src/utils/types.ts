export type Task = {
    id: number
    text: string
    done: boolean
    createdAt: string
}

export type PropsForTaskComponent = {
    task: Task
    taskMutable: {
        add: (task: Task) => void
        toggle: (task: Task) => void
        delete: (task: Task) => void
    }
}