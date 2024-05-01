import React, { ChangeEvent, useState } from 'react'

type Props = {
  oldTitle: string
  updateItem: (newTitle: string) => void
}

function EditableSpan({oldTitle, updateItem}: Props) {
  const [editMode, setEditMode] = useState(false)
  const [newTitle, setNewTitle] = useState(oldTitle)
  const activateEditModeHandler = () => {
    if(editMode) {
      updateItem(newTitle)
    }
    setEditMode(!editMode)
  }

  const changeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.currentTarget.value)
  }

  return (
    <>
    {editMode ? (
      <input 
        value={newTitle} 
        onBlur={activateEditModeHandler} 
        autoFocus
        onChange={changeTitleHandler}
        />
    ) : (
      <span onDoubleClick={activateEditModeHandler}>{oldTitle}</span>
    )}
      {/* <span className={isDone ? s.taskDone : s.task}>{title}</span> */}
    </>
  )
}

export default EditableSpan