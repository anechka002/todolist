import React from 'react'

type Props = {
  title: string
  onClick?: () => void
  className?: string
}

function Button({title, onClick, className}: Props) {
  return (
    <button onClick={onClick} className={className}>{title}</button>
  )
}

export default Button