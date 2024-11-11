import { List } from '@mui/material';
import { Task } from './task/Task'
import { TodoListDomainType } from '../../../bll/todolist-reducer';
import { useAppSelector } from 'common/hooks/useAppSelector';
import { selectTasks } from 'app/appSelectors';
import { RequestStatusType } from 'app/app-reducer';
import { TaskStatuses } from 'features/todolistsList/lib/enum';

type Props = {
  todolist: TodoListDomainType
}

export const Tasks = ({todolist}: Props) => {

  const { id, title, filter, addedDate, order, entityStatus } = todolist;

  let tasks = useAppSelector(selectTasks);
  // let tasks = useAppSelector((state) => state.tasks[id]);

  const allTodolistTasks = tasks[id]
  let tasksForTodolist = allTodolistTasks.map((task) => ({
    ...task,
    entityStatus: 'idle' as RequestStatusType, // Добавляем свойство entityStatus, если оно отсутствует
  }));

    if (filter === 'active') {
      tasksForTodolist = tasksForTodolist.filter((el) => el.status === TaskStatuses.New);
    }
    if (filter === 'completed') {
      tasksForTodolist = tasksForTodolist.filter((el) => el.status === TaskStatuses.Completed);
    }

  return (
    <div>
      {tasksForTodolist.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>
          {tasksForTodolist.map((el) => (
            <Task key={el.id} task={el} todolistId={id} />
          ))}
        </List>
      )}
    </div>
  )
}
