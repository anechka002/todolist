import React from 'react'

type ButtonPropsType = {
  title: string
}

function Button({title}: ButtonPropsType) {
  return (
    <button>{title}</button>
  )
}

export default Button