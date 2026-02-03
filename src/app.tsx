import { useEffect, useState } from 'react'
import './App.css'

type Task = {
    id: number
    text: string
    done: boolean
    createdAt: Date
}

export default function App() {
    const [input, setInput] = useState<string>('')
    const [tasks, setTasks] = useState<Task[]>([])

    useEffect(() => {
        const storedTasks = localStorage.getItem('tasks')
        if (storedTasks) {
            setTasks(JSON.parse(storedTasks))
        }
    }, [])

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
                    setTasks([
                        ...tasks,
                        {
                            id: tasks.length,
                            text: input,
                            done: false,
                            createdAt: new Date()
                        }
                    ])
                    setInput('')
                    localStorage.setItem('tasks', JSON.stringify(tasks))
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
                                    task.done = !task.done
                                }} />
                            <span className={task.done ? 'todo-text is-done' : 'todo-text'}>{task.text}</span>
                        </label>
                        <button className="todo-delete" type="button" onClick={() => {
                            setTasks(tasks.filter(t => t.id !== task.id))
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
