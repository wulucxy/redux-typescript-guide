/**
 * 根 reducer
 */
import { ReducersMapObject } from 'redux'
import bitcoin from '../pages/basic/reducer'
import { BitcoinState } from '../pages/basic/types'

// The top-level state object
export interface AppState {
  bitcoin: BitcoinState
}

const reducers: ReducersMapObject = {
  bitcoin,
}

export default reducers
