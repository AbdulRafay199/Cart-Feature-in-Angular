import {createReducer, on } from "@ngrx/store";
import { initialState } from "./counter.state";
import { add, deleteitem, reset } from "./counter.actions";

const _counterReducer=createReducer(initialState,
    on(add,(state:any,action:any)=>{return {...state, cartItems : action.product}}),
    on(deleteitem,(state:any,action:any)=>{return {...state, cartItems: state.cartItems.filter((item: any) => item !== action.product)}}),
    on(reset,(state:any)=>{return {...state, cartItems: []}}),
)

export function counterReducer(state: any, action:any){
    return _counterReducer(state,action)
}