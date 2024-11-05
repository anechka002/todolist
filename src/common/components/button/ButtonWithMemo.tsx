import React, { memo } from 'react'
import {Button, ButtonProps} from "@mui/material";

type Props = ButtonProps

export const ButtonWithMemo = memo(({...rest}: Props) => {
  return (
    <Button{...rest}/>
  )
})
