import React from 'react'
import { RadioChangeEvent } from 'antd/lib/radio/interface'
import { Radio } from 'antd'

const RadioButton = Radio.Button
const RadioGroup = Radio.Group

interface ChartsTabProps {
  handleChange: (e: RadioChangeEvent) => void
  filterType: string
}

const ChartsTab: React.FC<ChartsTabProps> = ({ handleChange, filterType }) => {
  return (
    <div className="chartsHeader">
      <RadioGroup onChange={handleChange} value={filterType}>
        <RadioButton value="week">1W</RadioButton>
        <RadioButton value="month">1M</RadioButton>
        <RadioButton value="year">1Y</RadioButton>
        <RadioButton value="all">ALL</RadioButton>
      </RadioGroup>
    </div>
  )
}

export default ChartsTab
