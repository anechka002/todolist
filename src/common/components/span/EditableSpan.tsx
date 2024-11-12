import { TextField } from '@mui/material'
import React, { ChangeEvent, useEffect, useState } from 'react'
import '../../../app/App.css'
import { UpdateDomainTaskModelType } from 'features/todolistsList/bll/task-reducer'

type Props = {
  oldTitle: string
  updateItem: (domainModel: UpdateDomainTaskModelType) => void
  disabled: boolean
}

export function EditableSpan({oldTitle, updateItem, disabled}: Props) {
  const [editMode, setEditMode] = useState(false)
  const [title, setTitle] = useState(oldTitle)
  
  console.log('oldTitle ', oldTitle)

  // useEffect(() => {
  //   console.log(oldTitle, 'useEffect')
  // }, [oldTitle])

  const activateEditModeHandler = () => {
    setEditMode(true)
  }
  const deactivateEditModeHandler = () => {
    setEditMode(false)
    updateItem({title})
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
          // disabled={disabled}
        />
      ) : (
        <span
          className={disabled ? 'disabled' : ''}
          onDoubleClick={!disabled ? activateEditModeHandler : undefined}
        >
          {oldTitle}
        </span>
      )}
    
      {/* <div>{oldTitle}</div> */}
    </>
  )
}
