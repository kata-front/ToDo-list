import { useRef } from 'react'
import './App.css'
import { Todo } from './components/task'
import { useTasks } from './hooks/tasks'

export default function App() {
    const inputRef = useRef<HTMLInputElement>(null)
    const {tasks, add, toggle, deleted} = useTasks()

    console.log('Render app')

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
                        add(inputRef.current.value)
                        inputRef.current.value = ''
                    }
                }}>
                    Add
                </button>
            </div>

            <ul className="todo-list">
                {tasks.map(task => {
                    console.log('Render task: ', task.id)
                    return <Todo
                        key={task.id}
                        task={task}
                        taskMutable={{
                            toggle,
                            deleted
                        }}
                    />
                })}
            </ul>
        </div>
    )
}
