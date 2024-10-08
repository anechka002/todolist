import React, { memo, useCallback, useEffect, useMemo } from 'react';
import { IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import {
  changeTodoListFilterAC,
  removeTodoListTC,
  TodoListDomainType,
  updateTodoListTC,
} from '../../../store/todolist-reducer';
import { AppRootStateType } from '../../../store/state/store';
import { TaskStatuses, TaskType } from '../../../api/todolists-api';
import { addTaskTC, getTasksTC } from '../../../store/task-reducer';
import { useAppDispatch } from '../../../hooks/hooks';
import { EditableSpan } from '../../../components/span/EditableSpan';
import { AddItemForm } from '../../../components/itemForm/AddItemForm';
import { ButtonWithMemo } from '../../../components/button/ButtonWithMemo';
import { Task } from './task/Task';

type Props = {
  todolist: TodoListDomainType;
};

export const TodoList = memo(({ todolist }: Props) => {
  const { id, title, filter, addedDate, order } = todolist;

  let tasks = useSelector<AppRootStateType, Array<TaskType>>(
    (state) => state.tasks[id]
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTasksTC(id));
  }, []);

  const addTaskHandler = useCallback(
    (newTitle: string) => {
      dispatch(addTaskTC(id, newTitle));
    },
    [dispatch]
  );

  const removeTodoListHandler = () => {
    dispatch(removeTodoListTC(id));
  };

  const updateTodoListHandler = (newTitle: string) => {
    dispatch(updateTodoListTC(id, newTitle));
  };

  const onAllClickHandler = useCallback(() => {
    dispatch(changeTodoListFilterAC(id, 'all'));
  }, [dispatch]);
  const onActiveClickHandler = useCallback(() => {
    dispatch(changeTodoListFilterAC(id, 'active'));
  }, [dispatch]);
  const onCompletedClickHandler = useCallback(() => {
    dispatch(changeTodoListFilterAC(id, 'completed'));
  }, [dispatch]);

  tasks = useMemo(() => {
    if (filter === 'active') {
      tasks = tasks.filter((el) => el.status === TaskStatuses.New);
    }
    if (filter === 'completed') {
      tasks = tasks.filter((el) => el.status === TaskStatuses.Completed);
    }

    return tasks;
  }, [tasks, filter]);

  return (
    <div>
      <h3>
        <EditableSpan oldTitle={title} updateItem={updateTodoListHandler} />
        <IconButton onClick={removeTodoListHandler}>
          <Delete />
        </IconButton>
      </h3>
      <AddItemForm addItem={addTaskHandler} />
      <div>
        {tasks.map((el) => (
          <Task key={el.id} taskId={el.id} todolistId={id} />
        ))}
      </div>
      <div>
        <ButtonWithMemo
          variant={filter === 'all' ? 'outlined' : 'text'}
          onClick={onAllClickHandler}
          color={'inherit'}
        >
          All
        </ButtonWithMemo>
        <ButtonWithMemo
          variant={filter === 'active' ? 'outlined' : 'text'}
          onClick={onActiveClickHandler}
          color={'primary'}
        >
          Active
        </ButtonWithMemo>
        <ButtonWithMemo
          variant={filter === 'completed' ? 'outlined' : 'text'}
          onClick={onCompletedClickHandler}
          color={'secondary'}
        >
          Completed
        </ButtonWithMemo>
      </div>
    </div>
  );
});
