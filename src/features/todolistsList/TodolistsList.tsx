import { addTodoListTC, getTodosTC } from "../../store/todolist-reducer";
import { useCallback, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { AddItemForm } from "../../components/itemForm/AddItemForm";
import Paper from "@mui/material/Paper";
import { TodoList } from "./todolist/TodoLists";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";

export const TodolistsList: React.FC = () => {
  const todolists = useAppSelector(
    (state) => state.todolists
  );

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