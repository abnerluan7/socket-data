import { useMemo } from 'react'

import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts'

import { theme } from '@/layouts/theme'

import { Temperature } from '@/types/Thermostat'

import { Content } from './styles'

interface MyProps {
  temperatureHistory: Temperature[]
}

const ChartComponent: React.FC<MyProps> = ({ temperatureHistory }) => {
  const temperatures = useMemo(() => {
    const formattedTemperatures: Temperature[] = []

    temperatureHistory.forEach((temperature) => {
      const hour = new Date(temperature.timestamp).getHours()
      const minutes = new Date(temperature.timestamp).getMinutes()
      const formateTime: Temperature = {
        ...temperature,
        time: `${hour}:${minutes}`
      }
      formattedTemperatures.push(formateTime)
    })
    return formattedTemperatures
  }, [temperatureHistory])

  const dataOne = temperatures.filter((e) => e.id === 1)
  const dataTwo = temperatures.filter((e) => e.id === 2)
  return (
    <Content>
      <LineChart width={1000} height={400}>
        <Line
          dataKey='temperature'
          data={dataOne}
          stroke={theme.palette.secondary.main}
        />
        <Line
          dataKey='temperature'
          stroke={theme.palette.primary.main}
          data={dataTwo}
        />
        <CartesianGrid stroke='#ccc' />
        <XAxis dataKey='time' />
        <YAxis />
      </LineChart>
    </Content>
  )
}

export default ChartComponent
