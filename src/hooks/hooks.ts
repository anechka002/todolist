import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { AppDispatchType, RootState } from "./../model/state/store"

// Use throughout your app instead of plain useDispatch and useSelector
export const useAppDispatch = useDispatch<AppDispatchType> //для санок

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector