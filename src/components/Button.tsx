import React from 'react';

type ButtonPropsType = {
  title: string
  changeFilter?: () => void
  deleteAllTasks?: () => void
}

function Button({title, changeFilter, deleteAllTasks}: ButtonPropsType) {

  const onChangeFilterHandler = () => {
    if(changeFilter) {
      changeFilter()
    } else if (deleteAllTasks) {
      deleteAllTasks()  
    } else {
      console.log('error')
    }
  }

  return (
    <button onClick={onChangeFilterHandler}>{title}</button>
  )
}

export default Button;