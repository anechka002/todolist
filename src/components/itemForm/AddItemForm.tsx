import { AddBox } from '@mui/icons-material';
import { Box, IconButton, TextField } from '@mui/material';
import React, { ChangeEvent, KeyboardEvent, memo, useState } from 'react';
import { filterButtonsContainerSx } from '../../features/todolistsList/todolist/TodoList.style';

type Props = {
  addItem: (newTitle: string) => void;
  disabled?: boolean
};

export const AddItemForm = memo(({ addItem, disabled }: Props) => {

  const [newTitle, setNewTitle] = useState('');
  const [error, setError] = useState<string | null>(null);

  const addTaskHandler = () => {
    if (newTitle.trim() !== '') {
      addItem(newTitle.trim());
      setNewTitle('');
    } else {
      setError('Title is required');
    }
  };

  const changeItemTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.currentTarget.value);
  };
  const addItemOnKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (error !== null) {
      setError(null);
    }
    if (e.key === 'Enter') {
      addTaskHandler();
    }
  };

  return (
    <Box sx={filterButtonsContainerSx}>
      <TextField
        id="outlined-basic"
        label="Title"
        variant="outlined"
        value={newTitle}
        error={!!error}
        size="small"
        onChange={changeItemTitleHandler}
        onKeyUp={addItemOnKeyUpHandler}
        helperText={error}
        disabled={disabled}
      />
      <IconButton color="primary" onClick={addTaskHandler} disabled={disabled}>
        <AddBox />
      </IconButton>
    </Box>
  );
});
