import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { AseguradoraSlice } from "./Slice";

const store = configureStore({
    reducer:{
        aseguradora : AseguradoraSlice.reducer
    }
})



export const useAppDispatch: ()=> typeof store.dispatch = useDispatch;
export const useAppSelector:TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;

export default store;