import { createReducer, on } from "@ngrx/store"
import { initialState } from "./product.state"
import { fetchproducts } from "./product.actions"

const _productreducer = createReducer(initialState,
    on(fetchproducts,(state: any, action: any)=>{
        return {...state, products: action.products}
    }))

export function productreducer(state:any, action:any){
    return _productreducer(state,action)
}