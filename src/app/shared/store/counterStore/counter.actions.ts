import { createAction, props } from "@ngrx/store";

export const add = createAction("add",props<{ product: any }>())
export const deleteitem = createAction("deleteitem",props<{ product: any }>())
export const reset = createAction("reset")