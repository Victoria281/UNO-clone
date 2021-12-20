import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from './store';

// exporting useAppDispatch with a type of AppDispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();

// useSelector (in the below sentence) is a function,
// and we are aliasing it with the useAppSelector by adding types
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;