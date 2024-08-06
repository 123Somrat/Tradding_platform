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
   reducers:{
      getProducts:()=>{
          console.log('getting product')
      },
       setProduct:(state,action)=>{
        state.products=action.payload
       },
      addProduct : (state,action)=>{
         console.log(state,action)
      },
      getSingleProduct:()=>{

      },
      updateSingleProduct:()=>{

      },
      deleteSingleProduct:()=>{


      }
   }



})
export default productSlicer