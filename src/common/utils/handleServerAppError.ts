import { setAppErrorAC, setAppStatusAC } from "app/bll/app-reducer"
import { AppDispatchType } from "app/store"
import { ResponseType } from 'common/types'

export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: AppDispatchType) => {
  dispatch(setAppErrorAC(data.messages[0]))
  dispatch(setAppStatusAC("failed"))

  // if(res.data.messages.length) {
  //   dispatch(setAppErrorAC(res.data.messages[0]))
  // } else {
  //   dispatch(setAppErrorAC('Some error occurred'))
  // }
  // dispatch(setAppStatusAC("failed"))
}

