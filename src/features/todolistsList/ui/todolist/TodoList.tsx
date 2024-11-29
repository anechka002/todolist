import React, { memo, useCallback, useEffect } from 'react';
import { TodoListDomainType } from '../../bll/todolist-reducer';
import { addTaskTC, getTasksTC } from '../../bll/task-reducer';
import { TodoListTitle } from './todoListTitle/TodoListTitle';
import { FilterTasksButton } from './filterTasksButton/FilterTasksButton';
import { Tasks } from './tasks/Tasks';
import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { AddItemForm } from 'common/components/itemForm/AddItemForm';

type Props = {
  todolist: TodoListDomainType;
};

export const TodoList = ({ todolist }: Props) => {
  const { id, title, filter, addedDate, order, entityStatus } = todolist;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTasksTC(id));
  }, []);

  const addTaskHandler = useCallback(
    (newTitle: string) => {
      dispatch(addTaskTC({todoListId: id, title: newTitle}));
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
};
