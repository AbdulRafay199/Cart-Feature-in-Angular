import { createAction, props } from "@ngrx/store";

export const fetchproducts = createAction("fetchproducts",props<{ products: any }>())