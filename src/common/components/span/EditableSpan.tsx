import { TextField } from '@mui/material'
import React, { ChangeEvent, useState } from 'react'
import '../../../app/App.css'

type Props = {
  oldTitle: string
  updateItem: (newTitle: string) => void
  disabled: boolean
}

export function EditableSpan({oldTitle, updateItem, disabled}: Props) {

  const [editMode, setEditMode] = useState(false)
  const [newTitle, setNewTitle] = useState(oldTitle)

  const activateEditModeHandler = () => {
    setEditMode(true)
    // Если мы выходим из режима редактирования, обновляем заголовок
    if(editMode) {
      updateItem(newTitle)
    } 
      setEditMode(!editMode)
  }

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
        // disabled={disabled}
      />
    : <span className={disabled ? 'disabled' : ''} onDoubleClick={!disabled ?activateEditModeHandler : undefined}>{oldTitle}</span>
}

