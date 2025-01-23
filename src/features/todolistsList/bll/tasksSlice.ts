import { ResultCode, TaskPriorities, TaskStatuses } from "../lib/enum/enums"
import { AppRootStateType, AppThunkType, RootState } from "../../../app/store"
import { _tasksAPI } from "../api/tasks-api"
import { TaskType, UpdateTaskModelType } from "../api/tasks-api.types"
import { handleServerAppError, handleServerNetworkError } from "common/utils"
import { createSlice, current } from "@reduxjs/toolkit"
import { RequestStatusType, setAppStatus } from "app/bll/appSlice"
import { addTodoList, clearData, removeTodoList } from "./todolistsSlice"

// types
export type TasksStateType = {
  [key: string]: Array<TaskDomainType>
}

export type TaskDomainType = TaskType & {
  entityStatus?: RequestStatusType
}

const initialState: TasksStateType = {}
// {
//   'todoId1': [{taskId: 1, title: 'bla'}, {taskId: 2, title: 'bla'},]
//   'todoId2': [{taskId: 1, title: 'bla'}]
//   'todoId3': [{taskId: 1, title: 'bla'}]
//   'todoId4': []
// }
export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: (create) => {
    return {
      setTasks: create.reducer<{ todolistId: string; tasks: TaskType[] }>((state, action) => {
        state[action.payload.todolistId] = action.payload.tasks.map((el) => ({ ...el, entityStatus: "idle" }))
      }),
      removeTask: create.reducer<{todoListId: string; taskId: string}>((state, action) => {
        const tasks = state[action.payload.todoListId]
        const index = tasks.findIndex((el) => el.id === action.payload.taskId)
        if(index !== -1) {
          tasks.splice(index, 1)
        }
      }),
      addTask: create.reducer<{task: TaskType}>((state, action) => {
        const tasks = state[action.payload.task.todoListId]
        const newTask: TaskDomainType = {
          ...action.payload.task,
          entityStatus: "idle",
        }
        tasks.unshift(newTask)
      }),      
      updateTask: create.reducer<{todoListId: string, id: string, model: UpdateDomainTaskModelType}>((state, action) => {
        const tasks = state[action.payload.todoListId]
        const index = tasks.findIndex((el) => el.id === action.payload.id)
        if(index !== -1) {
          tasks[index] = {...tasks[index], ...action.payload.model}
        }
      }),
      changeTaskEntityStatus: create.reducer<{todoListId: string, taskId: string, entityStatus: RequestStatusType}>((state, action) => {
        console.log(current(state))
        const tasks = state[action.payload.todoListId]
        const task = tasks.find((el) => el.id === action.payload.taskId)
        if(task) {
          task.entityStatus = action.payload.entityStatus;
        }
      }),
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTodoList, (state, action) => {
        state[action.payload.todoList.id] = []
      })
      .addCase(removeTodoList, (state, action) => {
        delete state[action.payload.todolistId]
      })
      .addCase(clearData, (state, action) => {
        return {}
      })
  },
  selectors: {
    selectTasks: state => state
  }
})

export const { setTasks, removeTask, addTask, updateTask, changeTaskEntityStatus } = tasksSlice.actions
export const tasksReducer = tasksSlice.reducer
export const {selectTasks} = tasksSlice.selectors

// thunks
export const getTasksTC =
  (todoListId: string): AppThunkType =>
  (dispatch) => {
    dispatch(setAppStatus({status: "loading"}))

    _tasksAPI
      .getTasks(todoListId)
      .then((res) => {
        dispatch(setAppStatus({status: "succeeded"}))
        dispatch(setTasks({todolistId: todoListId, tasks: res.data.items}))
      })
      .catch((err) => {
        handleServerNetworkError(err, dispatch)
      })
  }

export const addTaskTC =
  (arg: { todoListId: string; title: string }): AppThunkType =>
  (dispatch) => {
    dispatch(setAppStatus({status: "loading"}))

    _tasksAPI
      .createTask(arg)
      .then((res) => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(setAppStatus({status: "succeeded"}))
          dispatch(addTask({task: res.data.data.item}))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch((err) => {
        handleServerNetworkError(err, dispatch)
      })
  }

export const removeTaskTC =
  (arg: { todoListId: string; taskId: string }): AppThunkType =>
  (dispatch) => {
    dispatch(setAppStatus({status: "loading"}))
    dispatch(changeTaskEntityStatus({ todoListId: arg.todoListId, taskId: arg.taskId, entityStatus: "loading" }))

    _tasksAPI
      .deleteTask(arg)
      .then((res) => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(setAppStatus({status: "succeeded"}))
          dispatch(removeTask(arg))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch((err) => {
        handleServerNetworkError(err, dispatch)
      })
      .finally(() => {
        dispatch(changeTaskEntityStatus({ todoListId: arg.todoListId, taskId: arg.taskId, entityStatus: "idle" }))
      })
  }

// export const updateTaskTC =
//   (todoListId: string, id: string, domainModel: UpdateDomainTaskModelType): AppThunkType =>
//   (dispatch, getState: () => RootState) => {
//     const state = getState()
    // const task = state.tasks[todoListId].find((task) => task.id === id)
    // if (!task) {
    //   console.warn("task not found in the state")
    //   return
    // }
    // const apiModel: UpdateTaskModelType = {
    //   status: task.status,
    //   title: task.title,
    //   description: task.description,
    //   priority: task.priority,
    //   startDate: task.startDate,
    //   deadline: task.deadline,
    //   ...domainModel,
    // }

  //   dispatch(setAppStatus({status: "loading"}))
  //   dispatch(changeTaskEntityStatus({ todoListId, taskId: id, entityStatus: "loading" }))

  //   _tasksAPI
  //     .updateTask(todoListId, id, apiModel)
  //     .then((res) => {
  //       if (res.data.resultCode === ResultCode.Success) {
  //         dispatch(updateTask({todoListId, id, model: domainModel}))
  //         dispatch(setAppStatus({status: "succeeded"}))
  //       } else {
  //         handleServerAppError(res.data, dispatch)
  //       }
  //     })
  //     .catch((err) => {
  //       handleServerNetworkError(err, dispatch)
  //     })
  //     .finally(() => {
  //       dispatch(changeTaskEntityStatus({ todoListId, taskId: id, entityStatus: "idle" }))
  //     })
  // }

export type UpdateDomainTaskModelType = {
  title?: string
  description?: string
  status?: TaskStatuses
  priority?: TaskPriorities
  startDate?: string
  deadline?: string
}
