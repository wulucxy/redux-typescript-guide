import Thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise-middleware'
import logger from 'redux-logger'
import produce from 'immer'
import { createStore, applyMiddleware, Reducer } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { combineReducers } from 'redux-immer'

import reducers, { AppState } from './root'

const getMiddleware = () => {
  if (process.env.NODE_ENV !== 'development') {
    return applyMiddleware(Thunk, promiseMiddleware)
  } else {
    return applyMiddleware(Thunk, promiseMiddleware, logger)
  }
}

const rootReducer: Reducer<AppState> = combineReducers(produce, reducers)

export default function() {
  const store = createStore(rootReducer, composeWithDevTools(getMiddleware()))
  return store
}
