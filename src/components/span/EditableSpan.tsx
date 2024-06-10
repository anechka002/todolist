import { TextField } from '@mui/material'
import React, { ChangeEvent, useState } from 'react'

type Props = {
  oldTitle: string
  updateItem: (newTitle: string) => void
}

export function EditableSpan({oldTitle, updateItem}: Props) {
  const[editMode, setEditMode] = useState(false)
  const[newTitle, setNewTitle] = useState(oldTitle)
  const activateEditModeHandler = () => {
    setEditMode(true)
    if(editMode) {
      updateItem(newTitle)
    } 
      setEditMode(!editMode)
  }

  // const deactivateEditModeHandler = () => {
  //   setEditMode(false)
  //   updateItem(newTitle)
  // }

  const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.currentTarget.value)
  }
  return editMode 
    ? <TextField
        variant='outlined'
        value={newTitle}
        onBlur={activateEditModeHandler}
        onChange={changeTitleHandler}
        autoFocus
      />
    : <span onDoubleClick={activateEditModeHandler}>{oldTitle}</span>
}

