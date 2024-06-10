import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import Button from '../button/Button';

type Props = {
  addItem: (title: string) => void
}

function AddItemForm({addItem}: Props) {
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [taskInputError, setTaskInputError] = useState<string | null>(null)

  const isTitleTooLong = newTaskTitle.length > 15
  const ifTaskCanAdded = newTaskTitle && !isTitleTooLong

  const onChangeSetTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
    // console.log(e.currentTarget.value)
    setNewTaskTitle(e.currentTarget.value)
  }

  const onkeyDownAddTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setTaskInputError(null)
    if(e.key === 'Enter' && ifTaskCanAdded) {
      onClickAddTaskHandler()
    }
  }

  const onClickAddTaskHandler = () => {
    // debugger
    const trimmedTaskTitle = newTaskTitle.trim()
    if(trimmedTaskTitle) {
      addItem(trimmedTaskTitle)
      setNewTaskTitle('')     
    } else {
      setTaskInputError('Title is required')
    }
    setNewTaskTitle('')
  }

  return (
    <div>
        <input 
          className={taskInputError ? 'task-input-error' : ''} 
          value={newTaskTitle} 
          onChange={onChangeSetTaskTitle} 
          onKeyDown={onkeyDownAddTaskHandler} 
        />
        <Button 
          // disabled={!ifTaskCanAdded} 
          callBack={onClickAddTaskHandler} 
          title={'+'}
        />
        {isTitleTooLong && <div>Your task title is too long.</div>}
        {taskInputError && <div className='task-input-error-message'>{taskInputError}</div>}
      </div>
  )
}

export default AddItemForm