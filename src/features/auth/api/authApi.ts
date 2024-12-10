import { Inputs } from "../ui/login/Login";
import { ResponseType } from "common/types";
import { LoginArgs } from "./authApi.types";
import { instance } from "common/instance";

export const authApi = {
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