import { TaskStatuses } from '../../../../../api/todolists-api';
import { useAppSelector } from '../../../../../common/hooks/useAppSelector';
import { TodoListDomainType } from '../../../bll/todolist-reducer';
import { Task } from './task/Task'
import { List } from '@mui/material';
import { selectTasks } from '../../../../../app/appSelectors';
import { RequestStatusType } from '../../../../../app/app-reducer';

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
