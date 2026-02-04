import type { FC } from "react";
import type { PropsForTaskComponent } from "../utils/types";

export const Todo: FC<PropsForTaskComponent> = ({ task, taskMutable}) => {
    return <li className="todo-item">
        <label className="todo-main">
            <input
                className="todo-check"
                type="checkbox"
                checked={task.done}
                onChange={() => {
                    taskMutable.toggle(task)
                }} />
            <span className={task.done ? 'todo-text is-done' : 'todo-text'}>{task.text}</span>
        </label>
        <button className="todo-delete" type="button" onClick={() => {
            taskMutable.delete(task)
        }}>
            Delete
        </button>
    </li>
}
