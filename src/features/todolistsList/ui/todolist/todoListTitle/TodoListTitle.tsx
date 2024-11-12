import IconButton from '@mui/material/IconButton'
import { Delete } from '@mui/icons-material';
import { removeTodoListTC, TodoListDomainType, updateTodoListTC } from '../../../bll/todolist-reducer';
import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { EditableSpan } from 'common/components/span/EditableSpan';
import { UpdateDomainTaskModelType } from 'features/todolistsList/bll/task-reducer';

type Props = {
  todolist: TodoListDomainType
}

export const TodoListTitle = ({todolist}: Props) => {
  const { id, title, filter, addedDate, order, entityStatus } = todolist;

  const dispatch = useAppDispatch();

  const removeTodoListHandler = () => {
    dispatch(removeTodoListTC(id));
  };

  const updateTodoListHandler = (domainModel: UpdateDomainTaskModelType) => {
    if(domainModel.title) {
      dispatch(updateTodoListTC(id, domainModel.title));
    }
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
