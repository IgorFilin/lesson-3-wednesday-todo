import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./Todolist";


export type TaskPropsType = {
    idTodolist:string
    task:TaskType
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}
export const Task = React.memo(({task,removeTask,changeTaskStatus,changeTaskTitle,idTodolist}:TaskPropsType) => {
    const onClickHandler = useCallback(() => removeTask(task.id, idTodolist),[removeTask,task.id,idTodolist])
    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        changeTaskStatus(task.id, newIsDoneValue, idTodolist);
    },[changeTaskStatus,task.id,idTodolist])

    const onTitleChangeHandler = useCallback((newValue: string) => {
        changeTaskTitle(task.id, newValue, idTodolist);
    },[changeTaskTitle,task.id,idTodolist])
    return (
        <div key={task.id} className={task.isDone ? "is-done" : ""}>
                <Checkbox
                    checked={task.isDone}
                    color="primary"
                    onChange={onChangeHandler}
                />

                <EditableSpan value={task.title} onChange={onTitleChangeHandler} />
                <IconButton onClick={onClickHandler}>
                    <Delete />
                </IconButton>
            </div>
    );
});

