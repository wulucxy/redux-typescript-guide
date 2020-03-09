import React from 'react'
import { Spin } from 'antd'
import { RadioChangeEvent } from 'antd/lib/radio/interface'
import { connect } from 'react-redux'
import { get, isEmpty } from 'lodash'
import { format } from 'date-fns'

import { AppState } from '../../store/root'
import { ChartsRender, ChartsTab, DashBoard, Gitlab } from './components'
import { setFilterType, queryBPI, queryBPICurrency } from './reducer'

import { SetFilterType, QueryBPICurrency, QueryBPI, BitcoinState, BPIParams } from './types'

interface BasicProps extends BitcoinState {
  setFilterType: SetFilterType
  queryBPICurrency: QueryBPICurrency
  queryBPI: QueryBPI
}

interface BasicState {
  loading: boolean
}

class Basic extends React.Component<BasicProps, BasicState> {
  state = {
    loading: true,
  }

  handleRadioChange = (e: RadioChangeEvent) => {
    const { historical } = this.props
    const radioValue = e.target.value
    this.props.setFilterType(radioValue)
    if (!historical[radioValue]) {
      this.setState({
        loading: true,
      })
      let params = this.getPeriodTime(radioValue)
        // todo: promise not work
      ;(this.props.queryBPI(params) as any).then(() => {
        this.setState({
          loading: false,
        })
      })
    }
  }

  timeMap: Record<string, number> = {
    week: 7,
    month: 30,
    year: 365,
  }

  curTime = new Date()

  getPeriodTime = (filterType = 'week'): BPIParams => {
    const period = this.timeMap[filterType]
    const prevTime =
      filterType === 'all'
        ? new Date('2013-05-20')
        : new Date(this.curTime.getTime() - period * 24 * 60 * 60 * 1000)
    return Object.assign(
      { filterType },
      this.formatTime({
        start: prevTime,
        end: this.curTime,
      }),
    )
  }

  timeFormat = (date: Date) => format(date, 'YYYY-MM-DD')

  formatTime = ({ start, end }: { start: Date; end: Date }) => {
    return {
      start: this.timeFormat(start),
      end: this.timeFormat(end),
    }
  }

  componentDidMount() {
    const { queryBPICurrency, queryBPI } = this.props
    // 默认请求前一周的数据
    const params = this.getPeriodTime('week')
    // 并行请求：查询当前比特币价格，查询历史接口
    Promise.all([queryBPICurrency(), queryBPI(params)]).then(_ => {
      this.setState({
        loading: false,
      })
    })
  }

  render() {
    const { filterType, currentPrice, historical, requestLoading, updateTime } = this.props
    const _historical = historical[filterType] || []
    const isLoadDone = !isEmpty(historical) && !isEmpty(currentPrice) && requestLoading === false
    return (
      <div className="page">
        <Gitlab />
        <h1 className="tc">Bitcoin Price Index</h1>
        <div className="main-content">
          <ChartsTab handleChange={this.handleRadioChange} filterType={filterType} />
          <Spin spinning={this.state.loading}>
            <div className="chart-wrapper">
              {isLoadDone && (
                <React.Fragment>
                  <DashBoard
                    filterType={filterType}
                    historical={_historical}
                    updateTime={updateTime}
                  />
                  <ChartsRender historical={_historical} />
                </React.Fragment>
              )}
            </div>
          </Spin>
        </div>
      </div>
    )
  }
}

const select = (state: AppState) => {
  const { bitcoin } = state
  return {
    requestLoading: bitcoin.requestLoading,
    filterType: bitcoin.filterType,
    currentPrice: get(bitcoin, 'currentPrice.CNY', {}),
    historical: bitcoin.historical,
    updateTime: bitcoin.updateTime,
  }
}

export default connect(
  select,
  {
    setFilterType,
    queryBPI,
    queryBPICurrency,
  },
)(Basic)
