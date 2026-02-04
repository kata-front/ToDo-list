import { useEffect, useRef, useState } from 'react'
import './App.css'
import { type Task } from './utils/types'
import { controlledTasks } from './utils/storageController'
import { Todo } from './components/task'

export default function App() {
    const inputRef = useRef<HTMLInputElement>(null)
    const [tasks, setTasks] = useState<Task[]>(controlledTasks.load())

    useEffect(() => {
        controlledTasks.save(tasks)
    }, [tasks])

    const addTask = (task: Task): void => {
        setTasks(prev => [...prev, task])
    }

    const toggleTasks = (task: Task) => {
        setTasks(prev =>
            prev.map(t =>
                t.id === task.id
                    ? { ...t, done: !t.done }
                    : t
            )
        )
    }

    const deleteTask = (task: Task): void => {
        setTasks(prev => prev.filter(t => t.id !== task.id))
    }
    return (
        <div className="todo-app">
            <header className="todo-header">
                <h1>Todo</h1>
                <p>Clear tasks. Calm mind.</p>
            </header>

            <div className="todo-form">
                <input
                    className="todo-input"
                    type="text"
                    placeholder="Add a task..."
                    aria-label="Add a task"
                    ref={inputRef}
                />
                <button className="todo-add" type="button" onClick={() => {
                    if (inputRef.current && inputRef.current.value) {
                        addTask({
                            id: Date.now(),
                            text: inputRef.current.value,
                            done: false,
                            createdAt: new Date().toDateString()
                        })
                        inputRef.current.value = ''
                    }
                }}>
                    Add
                </button>
            </div>

            <ul className="todo-list">
                {tasks.map(task => (
                    <Todo
                        key={task.id}
                        task={task}
                        taskMutable={{
                            add: addTask,
                            toggle: toggleTasks,
                            delete: deleteTask
                        }}
                    />
                ))}
            </ul>
        </div>
    )
}
