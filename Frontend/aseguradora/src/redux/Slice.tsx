import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export interface Aseguradora{
    id: number,
    nombre: string,
    comision : number,
    statdo : boolean
}


interface AseguradoraState{
    aseguradora:Aseguradora[];
}

const initialState : AseguradoraState = {
    aseguradora: [],
}

type AseguradoraType = {
    id: number,
    nombre: string,
    comision : number,
    statdo : boolean
}

type ResponseCreate = {
    state: number,
    messate : string
}


export const AseguradoraSlice = createSlice({
    name:'form',
    initialState,
    reducers:{
        readAseguradora: ( state, action:PayloadAction<AseguradoraType[]>)=>{
            state.aseguradora = action.payload;
            //console.log(action.payload);
        }
    }
})


export const {readAseguradora} = AseguradoraSlice.actions;
export default AseguradoraSlice.reducer;