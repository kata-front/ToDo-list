import { useRef, useState, type ReactElement } from 'react'
import './App.css'
import type { Filters } from './utils/types'
import { useStats } from './hooks/useStats'
import { TasksContext, useTaskContext } from './hooks/useTasksContext'
import { TodoList } from './components/todoList'

export default function App(): ReactElement {
    const inputRef = useRef<HTMLInputElement>(null)
    const [filter, setFilter] = useState<Filters>('all')
    const { state, add, clear_compiled } = useTaskContext(TasksContext)

    const { total, done, active, progress } = useStats(state)

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
                    onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                            add(inputRef.current!.value!)
                            inputRef.current!.value! = ''
                        }
                    }}
                />
                <button className="todo-add" type="button" onClick={() => {
                    add(inputRef.current?.value!)
                    inputRef.current!.value! = ''
                }}>
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
                        All <span className="todo-count">{total}</span>
                    </button>
                    <button
                        className={`todo-filter ${filter === 'active' ? 'is-active' : ''}`}
                        type="button"
                        onClick={() => setFilter('active')}
                        aria-selected={filter === 'active'}
                    >
                        Active <span className="todo-count">{active}</span>
                    </button>
                    <button
                        className={`todo-filter ${filter === 'done' ? 'is-active' : ''}`}
                        type="button"
                        onClick={() => setFilter('done')}
                        aria-selected={filter === 'done'}
                    >
                        Done <span className="todo-count">{done}</span>
                    </button>
                </div>
                <div className="todo-actions">
                    <span className="todo-meta">{active} left</span>
                    <button
                        className="todo-clear"
                        type="button"
                        onClick={clear_compiled}
                        disabled={done === 0}
                    >
                        Clear done
                    </button>
                </div>
            </div>

            <div className="todo-stats" aria-live="polite">
                <div>
                    <p className="todo-stats-label">Progress</p>
                    <p className="todo-stats-value">{done} of {total} done</p>
                </div>
                <div className="todo-progress" aria-hidden="true">
                    <span className="todo-progress__bar" style={{ width: `${progress}%` }} />
                </div>
                <span className="todo-stats-badge">{progress}%</span>
            </div>

            <TodoList filter={filter}/>
        </div>
    )
}
