import { useCallback } from 'react';
import { Box, Button } from '@mui/material'
import { filterButtonsContainerSx } from './FilterTasksButton.styles'
import { changeTodoListFilterAC, TodoListDomainType } from '../../../bll/todolist-reducer';
import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { ButtonWithMemo } from 'common/components';

type Props = {
  todolist: TodoListDomainType;
}

export const FilterTasksButton = ({todolist}:Props) => {
  const { id, title, filter, addedDate, order, entityStatus } = todolist;

  const dispatch = useAppDispatch();

  const onAllClickHandler = useCallback(() => {
    dispatch(changeTodoListFilterAC(id, 'all'));
  }, [dispatch]);
  const onActiveClickHandler = useCallback(() => {
    dispatch(changeTodoListFilterAC(id, 'active'));
  }, [dispatch]);
  const onCompletedClickHandler = useCallback(() => {
    dispatch(changeTodoListFilterAC(id, 'completed'));
  }, [dispatch]);

  return (
    <Box sx={filterButtonsContainerSx}>
      <Button
        variant={filter === 'all' ? 'outlined' : 'text'}
        onClick={onAllClickHandler}
        color={'inherit'}
      >
        All
      </Button>
      <Button
        variant={filter === 'active' ? 'outlined' : 'text'}
        onClick={onActiveClickHandler}
        color={'primary'}
      >
        Active
      </Button>
      <ButtonWithMemo
        variant={filter === 'completed' ? 'outlined' : 'text'}
        onClick={onCompletedClickHandler}
        color={'secondary'}
      >
        Completed
      </ButtonWithMemo>
    </Box>
  )
}
