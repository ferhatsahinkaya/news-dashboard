import { reducers } from '../reducers'
import { createStore } from "redux";

function configureStore(initialState = {key: 'value'}) {
  const store = createStore(reducers, initialState);
  return store;
}

export const store = configureStore();
