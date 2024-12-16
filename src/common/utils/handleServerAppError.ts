import { setAppError, setAppStatus } from "app/bll/appSlice"
import { AppDispatchType } from "app/store"
import { ResponseType } from "common/types"

export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: AppDispatchType) => {
  dispatch(setAppError({error: data.messages[0]}))
  dispatch(setAppStatus({status: "failed"}))

  // if(res.data.messages.length) {
  //   dispatch(setAppErrorAC(res.data.messages[0]))
  // } else {
  //   dispatch(setAppErrorAC('Some error occurred'))
  // }
  // dispatch(setAppStatusAC("failed"))
}
