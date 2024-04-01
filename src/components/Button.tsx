import React from 'react';

type ButtonPropsType = {
  title: string
  changeFilter?: () => void
}

function Button({title, changeFilter}: ButtonPropsType) {

  const onClickHandler = () => {
    if(changeFilter) {
      changeFilter()
    } else {
      console.log('error')
    }
  }

  return (
    <button onClick={onClickHandler}>{title}</button>
  )
}

export default Button;