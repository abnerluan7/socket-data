import { checkIsLastTemperature, currentTime } from '@/utils/TemperatureUtils'
import { renderHook, act } from '@testing-library/react-hooks'

import { ThermostatProvider, useThermostat, MyProps } from './useThermostat'

function addMinutes(date: number, minutes: number) {
  return new Date(date + minutes * 60000).getTime()
}

const getRandomData = (from: number, to: number) =>
  Math.floor(Math.random() * to) + from

const generateRandomData = (currentTimestampDate: number) => {
  return [
    {
      id: 1,
      timestamp: addMinutes(currentTimestampDate, getRandomData(1, 7)),
      temperature: getRandomData(0, 40),
      data: getRandomData(0, 150)
    },
    {
      id: 2,
      timestamp: addMinutes(currentTimestampDate, getRandomData(1, 7)),
      temperature: getRandomData(0, 40),
      data: getRandomData(0, 150)
    }
  ]
}

describe('Thermostat', () => {
  it('should save 5 minutes data', async () => {
    const wrapper = ({ children }: MyProps) => (
      <ThermostatProvider>{children}</ThermostatProvider>
    )
    const currentTimestampDate = currentTime()
    const { result } = renderHook(() => useThermostat(), { wrapper })

    act(() => {
      for (let index = 0; index < 500; index++) {
        const randomData = generateRandomData(currentTimestampDate)
        result.current.makeTemperatures(randomData)
      }
    })

    result.current.temperatureHistory.forEach((temperature) => {
      const difference = currentTimestampDate - temperature.timestamp
      const minutesDifference = Math.floor(difference / 1000 / 60)
      expect(minutesDifference).toBeLessThanOrEqual(5)
      expect(temperature.data).toBeLessThanOrEqual(100)
    })
  })

  it('should return the most recent value', async () => {
    const wrapper = ({ children }: MyProps) => (
      <ThermostatProvider>{children}</ThermostatProvider>
    )
    const currentTimestampDate = currentTime()
    const { result } = renderHook(() => useThermostat(), { wrapper })

    act(() => {
      for (let index = 0; index < 500; index++) {
        const randomData = generateRandomData(currentTimestampDate)
        result.current.makeTemperatures(randomData)
      }
    })

    const [lastTemperatureThermostatOne, lastTemperatureThermostatTwo] =
      checkIsLastTemperature(result.current.temperatureHistory)

    expect(
      result.current.thermostat.find((e) => e.id === 1).timestamp
    ).toBeGreaterThanOrEqual(lastTemperatureThermostatOne.temperature)

    expect(
      result.current.thermostat.find((e) => e.id === 2).timestamp
    ).toBeGreaterThanOrEqual(lastTemperatureThermostatTwo.temperature)
  })
})
