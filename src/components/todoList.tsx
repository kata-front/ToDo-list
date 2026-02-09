import { lazy, memo, Suspense, type FC } from "react";
import { useFilteredTasks } from "../hooks/useFiltered";
import type { Filters } from "../utils/types";
import { TasksContext, useTaskContext } from "../hooks/useTasksContext";
const Todo = lazy(() => import('./task'))

export const TodoList: FC<{
    filter: Filters
}> = memo(({ filter }) => {
    const { state } = useTaskContext(TasksContext)
    const filteredTasks = useFilteredTasks(state, filter)

    return (
        <Suspense fallback={<div>Loading</div>}>
            <ul className="todo-list">
                {filteredTasks.length === 0 && (
                    <li className="todo-empty">
                        {filter === 'done' ? 'No completed tasks yet.' : 'No tasks here yet. Add one above.'}
                    </li>
                )}
                {filteredTasks.map(task => {
                    return <Todo
                        key={task.id}
                        task={task}
                    />
                })}
            </ul>
        </Suspense>
    )
})