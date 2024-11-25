import { useDispatch } from 'react-redux';
import { AppDispatchType } from "../../app/store"

// Хук для типизированного использования dispatch
// export const useAppDispatch = useDispatch<AppDispatchType>; //для санок
export const useAppDispatch = useDispatch.withTypes<AppDispatchType>();
