import React from 'react';

type ButtonPropsType = {
  title: string
  callBack: () => void
  disabled?: boolean
}

function Button({title, callBack, disabled}: ButtonPropsType) {

  const onClickHandler = () => {
    callBack()
  }

  return (
    <button disabled={disabled} onClick={onClickHandler}>{title}</button>
  )
}

export default Button;