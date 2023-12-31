import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { counterReducer } from '../shared/store/counterStore/counter.reducer';
import { productreducer } from '../shared/store/productStore/product.reducer';

export interface State {

}

export const reducers: ActionReducerMap<State> = {
  counter: counterReducer,
  products: productreducer
};


export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
