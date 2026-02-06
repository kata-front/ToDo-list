import type { FC } from "react";
import type { PropsForTaskComponent } from "../utils/types";

export const Todo: FC<PropsForTaskComponent> = ({ task, taskMutable}) => {
    return <li className={task.done ? 'todo-item is-done' : 'todo-item'} key={task.id}>
        <label className="todo-main">
            <input
                className="todo-check"
                type="checkbox"
                checked={task.done}
                onChange={() => {
                    taskMutable.toggle(task.id)
                }} />
            <span className="todo-content">
                <span className={task.done ? 'todo-text is-done' : 'todo-text'}>{task.text}</span>
                <span className="todo-date">{task.createdAt}</span>
            </span>
        </label>
        <button className="todo-delete" type="button" onClick={() => {
            taskMutable.deleted(task.id)
        }}>
            Delete
        </button>
    </li>
}
