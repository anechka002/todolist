import { appReducer, AppStateType, setAppError,  setAppStatus, setAppTheme } from "../appSlice"

let startState: AppStateType

beforeEach(() => {
  startState = {
    status: "idle",
    error: null,
    theme: "light",
  }
})

test("correct error message should be set", () => {
  const endState = appReducer(startState, setAppError({error: "some error"}))

  expect(endState.error).toBe("some error")
})

test("correct status should be set", () => {
  const endState = appReducer(startState, setAppStatus({status: "loading"}))

  expect(endState.status).toBe("loading")
})

test("correct theme should be set", () => {
  const endState = appReducer(startState, setAppTheme({theme: "dark"}))

  expect(endState.theme).toBe("dark")
})
