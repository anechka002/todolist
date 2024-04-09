import React from 'react';

type ButtonPropsType = {
  title: string
  changeFilter?: () => void
  deleteAllTasks?: () => void
  addTask?: () => void
  disabled?: boolean
}

function Button({title, changeFilter, deleteAllTasks, addTask, disabled}: ButtonPropsType) {

  const onChangeFilterHandler = () => {
    if(changeFilter) {
      changeFilter()
    } else if (deleteAllTasks) {
      deleteAllTasks()  
    } else if(addTask) {
      addTask()
    } else {
      console.log('error')
    }
  }

  return (
    <button disabled={disabled} onClick={onChangeFilterHandler}>{title}</button>
  )
}

export default Button;