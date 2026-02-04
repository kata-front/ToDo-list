import { useEffect, useState } from 'react'
import './App.css'
import { type Task } from './utils/types'
import { controlledTasks } from './utils/storageController'

export default function App() {
    const [input, setInput] = useState<string>('')
    const [tasks, setTasks] = useState<Task[]>([])

    useEffect(() => {
        setTasks(controlledTasks.load())
    }, [])

    useEffect(() => {
        controlledTasks.save(tasks)
    }, [tasks])

    const addTask = (task: Task): void => {
        setTasks(prev => [...prev, task])
        setInput('')
    }

    const updateTasks = (currentTask: Task): void => {
        currentTask.done = !currentTask.done
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
                    value={input}
                    onChange={e => setInput(e.target.value)}
                />
                <button className="todo-add" type="button" onClick={() => {
                    addTask({
                        id: tasks.length,
                        text: input,
                        done: false,
                        createdAt: new Date()
                    })
                }}>
                    Add
                </button>
            </div>

            <ul className="todo-list">
                {tasks.map(task => (
                    <li className="todo-item" key={task.id}>
                        <label className="todo-main">
                            <input
                                className="todo-check"
                                type="checkbox"
                                onChange={() => {
                                    updateTasks(task)
                                }} />
                            <span className={task.done ? 'todo-text is-done' : 'todo-text'}>{task.text}</span>
                        </label>
                        <button className="todo-delete" type="button" onClick={() => {
                            deleteTask(task)
                        }}>
                            Delete
                        </button>
                    </li>
                ))}
                <li className="todo-item">
                    <label className="todo-main">
                        <input className="todo-check" type="checkbox" />
                        <span className="todo-text">Finish the layout</span>
                    </label>
                    <button className="todo-delete" type="button">
                        Delete
                    </button>
                </li>
                <li className="todo-item">
                    <label className="todo-main">
                        <input className="todo-check" type="checkbox" defaultChecked />
                        <span className="todo-text is-done">Buy milk</span>
                    </label>
                    <button className="todo-delete" type="button">
                        Delete
                    </button>
                </li>
            </ul>
        </div>
    )
}
