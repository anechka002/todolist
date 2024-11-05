import React, { memo, useCallback, useEffect } from 'react';
import { TodoListDomainType } from '../../bll/todolist-reducer';
import { useAppDispatch } from '../../../../common/hooks/useAppDispatch';
import { addTaskTC, getTasksTC } from '../../bll/task-reducer';
import { AddItemForm } from '../../../../common/components/itemForm/AddItemForm';
import { TodoListTitle } from './todoListTitle/TodoListTitle';
import { FilterTasksButton } from './filterTasksButton/FilterTasksButton';
import { Tasks } from './tasks/Tasks';

type Props = {
  todolist: TodoListDomainType;
};

export const TodoList = memo(({ todolist }: Props) => {
  const { id, title, filter, addedDate, order, entityStatus } = todolist;

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

  return (
    <div>
      <TodoListTitle todolist={todolist} />
      <AddItemForm
        addItem={addTaskHandler}
        disabled={entityStatus === 'loading'}
      />
      <Tasks todolist={todolist}/>
      <FilterTasksButton todolist={todolist} />
    </div>
  );
});
