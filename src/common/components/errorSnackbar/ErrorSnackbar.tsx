import React, { useState } from 'react'
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useAppSelector } from 'common/hooks/useAppSelector';
import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { selectError } from 'app/appSelectors';
import { setAppErrorAC } from 'app/app-reducer';

export const ErrorSnackbar = () => {

  const error = useAppSelector(selectError)
  const dispatch = useAppDispatch()

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(setAppErrorAC(null))
  };

  return (
    <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity='error'
        variant="filled"
        sx={{ width: '100%' }}
      >
        {error}
      </Alert>
    </Snackbar>
  )
}
