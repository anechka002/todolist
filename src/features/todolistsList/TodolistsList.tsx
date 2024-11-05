import { useCallback, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { useAppSelector } from "../../common/hooks/useAppSelector";
import { useAppDispatch } from "../../common/hooks/useAppDispatch";
import { AddItemForm } from "../../common/components/itemForm/AddItemForm";
import { addTodoListTC, getTodosTC } from "./bll/todolist-reducer";
import { selectTodolists } from "../../app/appSelectors";
import { TodoList } from "./ui/todolist/TodoList";

export const TodolistsList: React.FC = () => {
  const todolists = useAppSelector(selectTodolists);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTodosTC());
  }, []);

  const addTodoList = useCallback(
    (title: string) => {
      const thunk = addTodoListTC(title);
      dispatch(thunk);
    },
    [dispatch]
  );
  return (
    <>
      <Grid container style={{ padding: '20px' }}>
        <AddItemForm addItem={addTodoList} />
      </Grid>
      <Grid container spacing={3}>
        {todolists.map((el) => {
          return (
            <Grid key={el.id} item>
              <Paper style={{ padding: '10px' }}>
                <TodoList todolist={el} />
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};