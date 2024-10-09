import { Checkbox, IconButton } from '@mui/material';
import React, { ChangeEvent, memo } from 'react';
import { removeTaskTC, TaskDomainType, updateTaskTC } from '../../../../store/task-reducer';
import { EditableSpan } from '../../../../components/span/EditableSpan';
import { Delete } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { AppRootStateType } from '../../../../store/state/store';
import { TaskStatuses } from '../../../../api/todolists-api';
import { useAppDispatch } from '../../../../hooks/hooks';

type Props = {
  todolistId: string;
  taskId: string;
};

export const Task = memo(({ todolistId, taskId }: Props) => {
  const task = useSelector<AppRootStateType, TaskDomainType>(
    (state) =>
      state.tasks[todolistId].find((el) => el.id === taskId) as TaskDomainType
  );
  const dispatch = useAppDispatch();

  const onClickHandler = () => dispatch(removeTaskTC(todolistId, task.id));

  const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let newIsDoneValue = e.currentTarget.checked;
    dispatch(
      updateTaskTC(todolistId, task.id, {
        status: newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New,
      })
    );
  };
  const updateTaskHandler = (newTitle: string) => {
    dispatch(updateTaskTC(todolistId, task.id, { title: newTitle }));
  };

  return (
    <div className={task.status === TaskStatuses.Completed ? 'is-done' : ''}>
      <Checkbox
        checked={task.status === TaskStatuses.Completed}
        onChange={onChangeTaskStatusHandler}
        color="primary"
        disabled={task.entityStatus === 'loading'}
      />
      <EditableSpan oldTitle={task.title} updateItem={updateTaskHandler} disabled={task.entityStatus === 'loading'}/>
      <IconButton onClick={onClickHandler} disabled={task.entityStatus === 'loading'}>
        <Delete />
      </IconButton>
    </div>
  );
});
