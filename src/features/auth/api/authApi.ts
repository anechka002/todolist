import { ResponseType } from "common/types";
import { LoginArgs } from "./authApi.types";
import { instance } from "common/instance";
import { baseApi } from "app/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      me: builder.query<ResponseType<{ id: number, email: string, login: string }>, void>({
        query: () => `/auth/me`,
      }),
      login: builder.mutation<ResponseType<{ userId: number; token: string }>, LoginArgs>({
        query: payload => {
          return {
            method: 'POST',
            url: 'auth/login',
            body: payload,
          }
        },
      }),
      logout: builder.mutation<ResponseType, void>({
        query: () => {
          return {
            method: 'DELETE',
            url: 'auth/login',
          }
        },
      }),
    }
  }
})

export const {useLoginMutation, useLogoutMutation, useMeQuery} = authApi





export const _authApi = {
  login(payload: LoginArgs) {
    return instance.post<ResponseType<{ userId: number; token: string }>>(`auth/login`, payload)
  },
  logout() {
    return instance.delete<ResponseType>(`auth/login`)
  },
  me() {
    return instance.get<ResponseType<{ id: number, email: string, login: string }>>(`/auth/me`)
  }
}