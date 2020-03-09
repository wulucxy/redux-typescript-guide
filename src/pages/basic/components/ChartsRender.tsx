import React from 'react'
import PropTypes from 'prop-types'
import { everyNth } from '@wac/one'
import { ResponsiveArea, curveLinear } from '@wac/r3'

import { PriceData } from '../types'

interface ChartProps {
  historical: PriceData[]
}

const DemoTooltip = (d: any) => {
  return (
    <div className="tooltip">
      <div className="d">{d[0].data.d}</div>
      <div className="close">{d[0].data.y.toFixed(2)}</div>
    </div>
  )
}

class ChartsRender extends React.PureComponent<ChartProps> {
  static propTypes = {
    historical: PropTypes.array,
  }
  render() {
    const { historical } = this.props
    const arrY = historical.map(d => d.y)
    let minY = Math.min(...arrY)
    if (minY > 10000) {
      minY = minY * 0.99
    }
    // 坐标轴指定点，只取10个，避免展示更多
    const tickValues = {
      xAxis: (scale: any) => {
        const domainInterval = Math.ceil(scale.domain().length / 10)
        return everyNth(scale.domain(), domainInterval)
      },
    }
    return (
      <div className="chartsRender" style={{ height: '360px' }}>
        <ResponsiveArea
          data={historical}
          margin={{
            top: 40,
            right: 80,
            bottom: 40,
            left: 80,
          }}
          minY={minY}
          label="d"
          enableLine
          TooltipComp={DemoTooltip}
          tickValues={tickValues}
          fillOpacity={0.5}
          lineStrokeWidth={2}
          curve={curveLinear}
          yAxisLegendOffset={-60}
          keys={['y']}
          xAxisLegend="date"
          yAxisLegend="Bitcoin price"
        />
      </div>
    )
  }
}

export default ChartsRender
