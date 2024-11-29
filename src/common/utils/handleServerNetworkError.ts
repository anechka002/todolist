import { setAppErrorAC, setAppStatusAC } from 'app/bll/app-reducer';
import { AppDispatchType } from './../../app/store';

export const handleServerNetworkError = (err: { message: string }, dispatch: AppDispatchType) => {
  dispatch(setAppErrorAC(err.message))
  dispatch(setAppStatusAC("failed"))
}