import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { AppDispatchType, RootState } from '../store/state/store';

// Хук для типизированного использования dispatch
export const useAppDispatch = useDispatch<AppDispatchType>; //для санок

// Хук для типизированного использования selector
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
