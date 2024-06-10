import React, { ButtonHTMLAttributes } from 'react';

type ButtonPropsType = {
  title: string
  callBack: () => void
  disabled?: boolean
}&ButtonHTMLAttributes<HTMLButtonElement>

function Button({title, callBack, disabled, ...restProps}: ButtonPropsType) {

  const onClickHandler = () => {
    callBack()
  }

  return (
    <button {...restProps} disabled={disabled} onClick={onClickHandler}>{title}</button>
  )
}

export default Button;