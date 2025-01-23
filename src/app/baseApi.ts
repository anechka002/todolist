import { ResultCode } from 'features/todolistsList/lib/enum';
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { setAppError } from "./bll/appSlice"

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: async (args, api, extraOptions) => {

    // await new Promise((resolve) => setTimeout(resolve, 2000)) // эмитация задержки

    const result = await fetchBaseQuery({
      baseUrl: process.env.REACT_APP_BASE_URL,
      prepareHeaders: headers => {
        headers.set('API-KEY', `${process.env.REACT_APP_API_KEY}`)
        headers.set('Authorization', `Bearer ${localStorage.getItem('sn-token')}`)
      },
    })(args, api, extraOptions)

    // debugger

    // 1. Global query errors
    if(result.error) {
      // debugger
      if(result.error.status === 'FETCH_ERROR') {
        api.dispatch(setAppError({error: result.error.error}))
      }
      if(result.error.status === 'PARSING_ERROR') {
        api.dispatch(setAppError({error: result.error.error}))
      }
      if(result.error.status === 'CUSTOM_ERROR') {
        api.dispatch(setAppError({error: result.error.error}))
      }
      if(result.error.status === 400) {
        api.dispatch(setAppError({error: (result.error.data as {message: string}).message}))
      }
      if (result.error.status === 403) {
        api.dispatch(setAppError({ error: '403 Forbidden Error. Check API-KEY' }))
      }
      if (result.error.status === 500) {
        api.dispatch(setAppError({ error: (result.error.data as {message: string}).message }))
      }
    }
    
    // 2. Result code errors
    if ((result.data as {resultCode: ResultCode}).resultCode === ResultCode.Error) {
      const messages = (result.data as {messages: string[]}).messages
      const error = messages.length ? messages[0] : 'Some error occurred'
      api.dispatch(setAppError({error: error}))
    }

    return result
  },
  endpoints: () => ({}),
  tagTypes: ['Todolist', 'Task'],
})