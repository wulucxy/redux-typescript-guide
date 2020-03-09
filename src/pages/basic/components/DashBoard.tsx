import React from 'react'
import { format } from 'date-fns'

import { PriceData } from '../types'

interface DashBoardProps {
  updateTime: string
  filterType: string
  historical: PriceData[]
}

class DashBoard extends React.PureComponent<DashBoardProps> {
  render() {
    const { filterType, historical = [], updateTime } = this.props
    // 当前价格
    const currentPrice = historical[historical.length - 1].y
    // 对比区间最早的数据
    const change = currentPrice - historical[0].y
    // 变化幅度
    const changePecent: string = ((change / historical[0].y) * 100).toFixed(2)
    // 是否下降
    const isFall = change < 0
    // 根据是否下降展示不同标记
    const Flag = isFall ? (
      <span className="fall flag">-</span>
    ) : (
      <span className="rise flag">+</span>
    )
    // 定义不同时间维度
    const periodTypeMap: Record<string, string> = {
      week: '上周',
      month: '上月',
      year: '去年',
    }
    const formatTime = format(updateTime, 'YYYY-MM-DD')
    return (
      <div className="dashBoard flex">
        <div className="left box">
          <div className="heading">{currentPrice.toFixed(2)}</div>
          <div className="subtext">
            当前价格(元)（更新时间：
            {formatTime}）
          </div>
        </div>
        {filterType !== 'all' && (
          <React.Fragment>
            <div className="middle box">
              <div className="heading">
                {Flag}
                {Math.abs(change).toFixed(2)}
              </div>
              <div className="subtext">
                相比
                {periodTypeMap[filterType]}
                (元)
              </div>
            </div>
            <div className="right box">
              <div className="heading">
                {Flag}
                {Math.abs(Number(changePecent))}
                <span className="percent">%</span>
              </div>
              <div className="subtext">
                相比
                {periodTypeMap[filterType]}
                （%）
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
    )
  }
}

export default DashBoard
