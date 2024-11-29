import { TextField } from '@mui/material'
import React, { ChangeEvent, useState } from 'react'
import '../../../app/App.css'
import { UpdateDomainTaskModelType } from 'features/todolistsList/bll/task-reducer'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { setAppErrorAC } from 'app/bll/app-reducer'

type Props = {
  oldTitle: string
  updateItem: (domainModel: UpdateDomainTaskModelType) => void
  disabled?: boolean
}

export function EditableSpan({oldTitle, updateItem, disabled}: Props) {
  const [editMode, setEditMode] = useState(false)
  const [title, setTitle] = useState(oldTitle)

  const dispatch = useAppDispatch()

  const activateEditModeHandler = () => {
    if (disabled) {
      return
    }
    setEditMode(true)
  }

  const deactivateEditModeHandler = () => {   
    if (title.length < 1) {
      dispatch(setAppErrorAC('The Title field is required'));
    }
    if (title.length > 100) {
      dispatch(setAppErrorAC('The Title is too long'));
    }  
    // Проверяем, если оба условия не выполняются
    if (title.length >= 1 && title.length <= 100) {
      setEditMode(false);
      updateItem({ title });
    }
  }

  const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  return (
    <>
      {editMode ? (
        <TextField
          variant='outlined'
          value={title}
          onBlur={deactivateEditModeHandler}
          onChange={changeTitleHandler}
          autoFocus
        />
      ) : (
        <span
          className={disabled ? 'disabled' : ''}
          onDoubleClick={!disabled ? activateEditModeHandler : undefined}
        >
          {oldTitle}
        </span>
      )}
    </>
  )
}
