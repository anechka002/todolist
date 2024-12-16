import { appReducer, InitialStateType, setAppErrorAC, setAppStatusAC, setAppThemeAC } from "../appSlice"

let startState: InitialStateType

beforeEach(() => {
  startState = {
    status: "idle",
    error: null,
    theme: "light",
  }
})

test("correct error message should be set", () => {
  const endState = appReducer(startState, setAppErrorAC("some error"))

  expect(endState.error).toBe("some error")
})

test("correct status should be set", () => {
  const endState = appReducer(startState, setAppStatusAC("loading"))

  expect(endState.status).toBe("loading")
})

test("correct theme should be set", () => {
  const endState = appReducer(startState, setAppThemeAC("dark"))

  expect(endState.theme).toBe("dark")
})
