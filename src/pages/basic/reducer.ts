import typeToReducer from 'type-to-reducer'
import { AsyncAction } from 'redux-promise-middleware'
import axios from '../../common/axios'
import { BitcoinActionTypes, BPIParams } from './types'

const initialState = {
  filterType: 'week',
  requestLoading: false,
  currentPrice: {},
  historical: {},
  updateTime: '',
}

// 设置过滤条件
export const setFilterType = (filterType: string) => ({
  type: BitcoinActionTypes.BITCOIN_SET_FILTER,
  payload: { filterType },
})

// 请求比特币历史价格接口
export const queryBPI = (params: BPIParams): AsyncAction => {
  return {
    type: BitcoinActionTypes.BITCOIN_QUERY_LIST,
    payload: axios.get('//api.coindesk.com/v1/bpi/historical/close.json?currency=cny', {
      params,
    }),
    meta: params,
  }
}

// 请求比特币当前价格
export const queryBPICurrency = (): AsyncAction => {
  return {
    type: BitcoinActionTypes.BITCOIN_QUERY_CURRENCY,
    payload: axios.get('//api.coindesk.com/v1/bpi/currentprice/cny.json'),
  }
}

export default typeToReducer(
  {
    [BitcoinActionTypes.BITCOIN_SET_FILTER]: (state, action) => {
      const { filterType } = action.payload
      state.filterType = filterType
      return state
    },
    [BitcoinActionTypes.BITCOIN_QUERY_LIST]: {
      PENDING: state => {
        state.requestLoading = true
        return state
      },
      FULFILLED: (state, action) => {
        const { bpi, time } = action.payload
        const { filterType } = action.meta

        const sortedData = []
        for (let date in bpi) {
          sortedData.push({
            d: date,
            y: bpi[date],
          })
        }

        state.requestLoading = false
        state.historical[filterType] = sortedData
        state.updateTime = time.updated
        return state
      },
    },
    [BitcoinActionTypes.BITCOIN_QUERY_CURRENCY]: {
      PENDING: state => state,
      FULFILLED: (state, action) => {
        const { bpi } = action.payload
        state.currentPrice = bpi
        return state
      },
    },
  },
  initialState,
)
