import { memo, type FC } from "react";
import type { PropsForTaskComponent } from "../utils/types";
import { TasksContext, useTaskContext } from "../hooks/useTasksContext";

const Todo: FC<PropsForTaskComponent> = memo(({ task }) => {
    const { toggle, deleted } = useTaskContext(TasksContext)
    console.log('Render task: ', task.id)
    return <li className={task.done ? 'todo-item is-done' : 'todo-item'}>
        <label className="todo-main">
            <input
                className="todo-check"
                type="checkbox"
                checked={task.done}
                onChange={() => {
                    toggle(task.id)
                }} />
            <span className="todo-content">
                <span className={task.done ? 'todo-text is-done' : 'todo-text'}>{task.text}</span>
                <span className="todo-date">{task.createdAt}</span>
            </span>
        </label>
        <button className="todo-delete" type="button" onClick={() => {
            deleted(task.id)
        }}>
            Delete
        </button>
    </li>
})

export default Todo