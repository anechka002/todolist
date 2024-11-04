import { useSelector } from "react-redux";
import { RootState } from "../store/state/store";

// Хук для типизированного использования selector
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppSelector = useSelector.withTypes<RootState>()