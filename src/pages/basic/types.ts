import { setFilterType, queryBPI, queryBPICurrency } from './reducer'

export enum BitcoinActionTypes {
  // 请求比特币周期价格指数
  BITCOIN_QUERY_LIST = 'BITCOIN_QUERY_LIST',
  // 请求比特币当前价格
  BITCOIN_QUERY_CURRENCY = 'BITCOIN_QUERY_CURRENCY',
  // 设置当前过滤条件
  BITCOIN_SET_FILTER = 'BITCOIN_SET_FILTER',
}

export type FilterType = 'week' | 'year' | 'month' | 'all'

interface BitcoinPrice {
  code: string
  rate: string
  description: string
  rate_float: number
}

// 数据
export interface PriceData {
  d: Date | string
  y: number
}

// state 类型
export interface BitcoinState {
  filterType: string
  requestLoading: boolean
  currentPrice: Record<string, BitcoinPrice>
  historical: Record<string, PriceData[]>
  updateTime: string
}

// 请求参数
export interface BPIParams {
  filterType: FilterType
  start: string
  end: string
}

// 普通方法可以直接推导
export type SetFilterType = typeof setFilterType
// 返回 Promise 需要自定义
export type QueryBPI = typeof queryBPI
export type QueryBPICurrency = typeof queryBPICurrency
// todo:
export type BPIActions = SetFilterType | QueryBPI | QueryBPICurrency
