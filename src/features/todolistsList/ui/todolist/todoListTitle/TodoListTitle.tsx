import IconButton from '@mui/material/IconButton'
import { Delete } from '@mui/icons-material';
import { removeTodoListTC, TodoListDomainType, updateTodoListTC } from '../../../bll/todolist-reducer';
import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { EditableSpan } from 'common/components/span/EditableSpan';

type Props = {
  todolist: TodoListDomainType
}

export const TodoListTitle = ({todolist}: Props) => {
  const { id, title, filter, addedDate, order, entityStatus } = todolist;

  const dispatch = useAppDispatch();

  const removeTodoListHandler = () => {
    dispatch(removeTodoListTC(id));
  };

  const updateTodoListHandler = (newTitle: string) => {
    dispatch(updateTodoListTC(id, newTitle));
  };

  return (
    <div>
      <h3>
        <EditableSpan oldTitle={title} updateItem={updateTodoListHandler} disabled={entityStatus === 'loading'} />
        <IconButton onClick={removeTodoListHandler} disabled={entityStatus === 'loading'}>
          <Delete />
        </IconButton>
      </h3>
    </div>
  )
}
