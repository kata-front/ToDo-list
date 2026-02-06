import { useMemo, useRef, useState } from 'react'
import './App.css'
import { Todo } from './components/task'
import { useTasks } from './hooks/tasks'

export default function App() {
    const inputRef = useRef<HTMLInputElement>(null)
    const [filter, setFilter] = useState<'all' | 'active' | 'done'>('all')
    const {tasks, add, toggle, deleted, clearCompleted} = useTasks()

    console.log('Render app')

    const stats = useMemo(() => {
        const total = tasks.length
        const done = tasks.filter(task => task.done).length
        const active = total - done
        const progress = total === 0 ? 0 : Math.round((done / total) * 100)

        return { total, done, active, progress }
    }, [tasks])

    const filteredTasks = useMemo(() => {
        if (filter === 'active') {
            return tasks.filter(task => !task.done)
        }
        if (filter === 'done') {
            return tasks.filter(task => task.done)
        }
        return tasks
    }, [tasks, filter])

    const handleAdd = () => {
        const value = inputRef.current?.value?.trim()
        if (!value) {
            return
        }
        add(value)
        if (inputRef.current) {
            inputRef.current.value = ''
            inputRef.current.focus()
        }
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
                    onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                            handleAdd()
                        }
                    }}
                />
                <button className="todo-add" type="button" onClick={handleAdd}>
                    Add
                </button>
            </div>

            <div className="todo-toolbar">
                <div className="todo-filters" role="tablist" aria-label="Task filters">
                    <button
                        className={`todo-filter ${filter === 'all' ? 'is-active' : ''}`}
                        type="button"
                        onClick={() => setFilter('all')}
                        aria-selected={filter === 'all'}
                    >
                        All <span className="todo-count">{stats.total}</span>
                    </button>
                    <button
                        className={`todo-filter ${filter === 'active' ? 'is-active' : ''}`}
                        type="button"
                        onClick={() => setFilter('active')}
                        aria-selected={filter === 'active'}
                    >
                        Active <span className="todo-count">{stats.active}</span>
                    </button>
                    <button
                        className={`todo-filter ${filter === 'done' ? 'is-active' : ''}`}
                        type="button"
                        onClick={() => setFilter('done')}
                        aria-selected={filter === 'done'}
                    >
                        Done <span className="todo-count">{stats.done}</span>
                    </button>
                </div>
                <div className="todo-actions">
                    <span className="todo-meta">{stats.active} left</span>
                    <button
                        className="todo-clear"
                        type="button"
                        onClick={clearCompleted}
                        disabled={stats.done === 0}
                    >
                        Clear done
                    </button>
                </div>
            </div>

            <div className="todo-stats" aria-live="polite">
                <div>
                    <p className="todo-stats-label">Progress</p>
                    <p className="todo-stats-value">{stats.done} of {stats.total} done</p>
                </div>
                <div className="todo-progress" aria-hidden="true">
                    <span className="todo-progress__bar" style={{ width: `${stats.progress}%` }} />
                </div>
                <span className="todo-stats-badge">{stats.progress}%</span>
            </div>

            <ul className="todo-list">
                {filteredTasks.length === 0 && (
                    <li className="todo-empty">
                        {filter === 'done' ? 'No completed tasks yet.' : 'No tasks here yet. Add one above.'}
                    </li>
                )}
                {filteredTasks.map(task => {
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
