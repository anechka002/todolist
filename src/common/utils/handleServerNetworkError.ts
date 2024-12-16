import { setAppError, setAppStatus } from "app/bll/appSlice"
import { AppDispatchType } from "./../../app/store"

export const handleServerNetworkError = (err: { message: string }, dispatch: AppDispatchType) => {
  dispatch(setAppError({error: err.message}))
  dispatch(setAppStatus({status: "failed"}))
}
