import { createSlice } from "@reduxjs/toolkit";


type TinitialState = {
     userId:number,
     id:number,
     title:string,
     body:string
};


type initialState = {
    products : TinitialState[]
}

const initialState:initialState = {
    products : []
}
const productSlicer = createSlice({
   name:'product',
   initialState,
   reducers:{}



})
export default productSlicer